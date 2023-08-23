import { join } from "path";
import { promisify } from "util";
import { writeFile } from "fs";
import * as Sentry from "@sentry/node";

import {
  Contact as WbotContact,
  Message as WbotMessage,
  MessageAck,
  Client
} from "whatsapp-web.js";

import Contact from "../../models/Contact";
import Ticket from "../../models/Ticket";
import Message from "../../models/Message";
import { getIO } from "../../libs/socket";
import CreateMessageService from "../MessageServices/CreateMessageService";
import { logger } from "../../utils/logger";
import CreateOrUpdateContactService from "../ContactServices/CreateOrUpdateContactService";
import FindOrCreateTicketService from "../TicketServices/FindOrCreateTicketService";
import ShowWhatsAppService from "../WhatsappService/ShowWhatsAppService";
import { debounce } from "../../helpers/Debounce";
import UpdateTicketService from "../TicketServices/UpdateTicketService";
import CreateContactService from "../ContactServices/CreateContactService";
import formatBody from "../../helpers/Mustache";
import templateSelector from "../../helpers/TemplateSelector";
import { Request } from "express";
import GetWhatsAppByPhoneNumber from "../WhatsappService/GetWhatsAppByPhoneNumber";
import GetLastMessageSent from "../MessageServices/GetLastMessageSent";
import Template from "../../models/Template";
import UpdateContactService from "../ContactServices/UpdateContactService";

interface Session extends Client {
  id?: number;
}

const writeFileAsync = promisify(writeFile);

const verifyContact = async (msgContact: WbotContact, storeId: number, msg?: WbotMessage): Promise<Contact> => {
  const profilePicUrl = await msgContact.getProfilePicUrl();

  const contactData = {
    name: msgContact.name || msgContact.pushname || msgContact.id.user,
    storeId: storeId,
    number: msgContact.id.user,
    profilePicUrl,
    isGroup: msgContact.isGroup,
    extraInfo: msg ? [
      {
        name: "nome completo",
        value: msg.body
      }
    ] : undefined
  };

  const contact = await CreateOrUpdateContactService(contactData);
  return contact;
};
const verifyQuotedMessage = async (
  msg: WbotMessage
): Promise<Message | null> => {
  if (!msg.hasQuotedMsg) return null;

  const wbotQuotedMsg = await msg.getQuotedMessage();

  const quotedMsg = await Message.findOne({
    where: { id: wbotQuotedMsg.id.id }
  });

  if (!quotedMsg) return null;

  return quotedMsg;
};


// generate random id string for file names, function got from: https://stackoverflow.com/a/1349426/1851801
function makeRandomId(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const verifyMediaMessage = async (
  msg: WbotMessage,
  ticket: Ticket,
  storeId: number,
): Promise<Message> => {
  const quotedMsg = await verifyQuotedMessage(msg);

  const media = await msg.downloadMedia();

  if (!media) {
    throw new Error("ERR_WAPP_DOWNLOAD_MEDIA");
  }

  let randomId = makeRandomId(5);

  if (!media.filename) {
    const ext = media.mimetype.split("/")[1].split(";")[0];
    media.filename = `${randomId}-${new Date().getTime()}.${ext}`;
  } else {
    media.filename = media.filename.split('.').slice(0, -1).join('.') + '.' + randomId + '.' + media.filename.split('.').slice(-1);
  }

  try {
    await writeFileAsync(
      join(__dirname, "..", "..", "..", "public", media.filename),
      media.data,
      "base64"
    );
  } catch (err) {
    Sentry.captureException(err);
    logger.error(err);
  }

  const messageData = {
    id: msg.id.id,
    ticketId: ticket.id,
    storeId: storeId,
    body: msg.body || media.filename,
    from: msg.from.replace(/[^0-9]/g, ""),
    to: msg.to.replace(/[^0-9]/g, ""),
    fromMe: msg.fromMe,
    read: msg.fromMe,
    mediaUrl: media.filename,
    mediaType: media.mimetype.split("/")[0],
    quotedMsgId: quotedMsg?.id
  };

  await ticket.update({ lastMessage: msg.body || media.filename });
  const newMessage = await CreateMessageService({ messageData });

  return newMessage;
};

const verifyMessage = async (
  msg: WbotMessage,
  ticket: Ticket,
  contact: Contact,
  storeId: number
) => {

  if (msg.type === 'location')
    msg = prepareLocation(msg);
  const quotedMsg = await verifyQuotedMessage(msg);
  const messageData = {
    id: msg.id.id,
    storeId: storeId,
    ticketId: ticket.id,
    contactId: msg.fromMe ? undefined : contact.id,
    templateId: null,
    from: msg.from.replace(/[^0-9]/g, ""),
    to: msg.to.replace(/[^0-9]/g, ""),
    body: msg.body,
    fromMe: msg.fromMe,
    mediaType: msg.type,
    read: msg.fromMe,
    quotedMsgId: quotedMsg?.id
  };

  await ticket.update({ lastMessage: msg.type === "location" ? msg.location.description ? "Localization - " + msg.location.description.split('\\n')[0] : "Localization" : msg.body });

  await CreateMessageService({ messageData });
};

const verifyMessageSent = async (
  msg: WbotMessage,
  ticket: Ticket,
  contact: Contact,
  templateId: number | null,
  storeId: number
) => {
  if (msg.type === 'location')
    msg = prepareLocation(msg);
  const quotedMsg = await verifyQuotedMessage(msg);
  const messageData = {
    id: msg.id.id,
    storeId: storeId,
    ticketId: ticket.id,
    contactId: msg.fromMe ? undefined : contact.id,
    templateId: templateId ? templateId : null,
    from: msg.from.replace(/[^0-9]/g, ""),
    to: msg.to.replace(/[^0-9]/g, ""),
    body: msg.body,
    fromMe: msg.fromMe,
    mediaType: msg.type,
    read: msg.fromMe,
    quotedMsgId: quotedMsg?.id
  };

  await ticket.update({ lastMessage: msg.type === "location" ? msg.location.description ? "Localization - " + msg.location.description.split('\\n')[0] : "Localization" : msg.body });

  await CreateMessageService({ messageData });
}

const prepareLocation = (msg: WbotMessage): WbotMessage => {
  let gmapsUrl = "https://maps.google.com/maps?q=" + msg.location.latitude + "%2C" + msg.location.longitude + "&z=17&hl=pt-BR";

  msg.body = "data:image/png;base64," + msg.body + "|" + gmapsUrl;

  msg.body += "|" + (msg.location.description ? msg.location.description : (msg.location.latitude + ", " + msg.location.longitude))

  return msg;
};

const verifyQueue = async (
  wbot: Session,
  ticket: Ticket,
  queueId: null | number
) => {
  const { queues, greetingMessage } = await ShowWhatsAppService(wbot.id!);

  if (queues.length === 1) {
    await UpdateTicketService({
      ticketData: { queueId: queues[0].id },
      ticketId: ticket.id
    });

    return;
  }

  if (queueId) {
    await UpdateTicketService({
      ticketData: { queueId: queueId },
      ticketId: ticket.id
    });
  }
};

const isValidMsg = (msg: WbotMessage): boolean => {
  if (msg.from === "status@broadcast") return false;
  if (
    msg.type === "chat" ||
    msg.type === "audio" ||
    msg.type === "ptt" ||
    msg.type === "video" ||
    msg.type === "image" ||
    msg.type === "document" ||
    msg.type === "vcard" ||
    msg.type === "sticker" ||
    msg.type === "location"
  )
    return true;
  return false;
};

const handleInvalidOption = async (
  wbot: Session,
  contact: Contact,
  messageToSend: Template,
  ticket: Ticket,
  storeId: number
) => {
  let lastSentMessage = await GetLastMessageSent(contact);
  let currentTemplateId = messageToSend.id
  let lastTemplateId = lastSentMessage ? lastSentMessage.templateId : null;
  let invalidOption = "Opa, opção inválida por favor responda com o número que corresponde a opção desejada.🤖";
  if (lastTemplateId && currentTemplateId === lastTemplateId) {
    let optionEnforcer = await wbot.sendMessage(`${contact.number}@c.us`, invalidOption);
    await verifyMessageSent(optionEnforcer, ticket, contact, 1, storeId);
  }
};
const verifyContactFullName = async (msg: WbotMessage, contact: Contact): Promise<Contact | undefined> => {
  const contactData = {
    extraInfo: [
      {
        name: "nome completo",
        value: msg.body
      }
    ]
  };
  const contactId = contact.id.toString()
  const contactWFullName = await UpdateContactService({ contactData, contactId });

  return contactWFullName;
};

const handleMessage = async (
  msg: WbotMessage,
  wbot: Session,
  req: Request
): Promise<void> => {
  let info = wbot.info.wid.user
  let storeId = (await GetWhatsAppByPhoneNumber(info)).storeId

  if (!isValidMsg(msg)) {
    return;
  }

  try {
    let msgContact: WbotContact;
    let groupContact: Contact | undefined;

    if (msg.fromMe) {

      if (/\u200e/.test(msg.body[0])) return;

      if (!msg.hasMedia && msg.type !== "location" && msg.type !== "chat" && msg.type !== "vcard"

      ) return;

      msgContact = await wbot.getContactById(msg.to);

    } else {
      msgContact = await msg.getContact();
    }


    const chat = await msg.getChat();

    if (chat.isGroup) {
      let msgGroupContact;

      if (msg.fromMe) {
        msgGroupContact = await wbot.getContactById(msg.to);
      } else {
        msgGroupContact = await wbot.getContactById(msg.from);
      }

      groupContact = await verifyContact(msgGroupContact, storeId);
    }
    const whatsapp = await ShowWhatsAppService(wbot.id!);
    const unreadMessages = msg.fromMe ? 0 : chat.unreadCount;
    let contact = await verifyContact(msgContact, storeId);

    if (
      unreadMessages === 0 &&
      whatsapp.farewellMessage &&
      formatBody(whatsapp.farewellMessage, contact) === msg.body
    )
      return;

    const ticket = await FindOrCreateTicketService(
      contact,
      wbot.id!,
      unreadMessages,
      storeId,
      groupContact
    );

    if (!msg.fromMe && ticket.status === "pending") {
      if (msg.hasMedia) {
        await verifyMediaMessage(msg, ticket, storeId);
      }
      await verifyMessage(msg, ticket, contact, storeId)
      const lastSentMessage = await GetLastMessageSent(contact)
      console.log("lastsentmessage", lastSentMessage?.templateId)
      if (lastSentMessage?.templateId === 1 && msg.type === "chat") {
        console.log("entrou no if")
        console.log("msgbody", msg.body)
        await verifyContactFullName(msg, contact)
      }
      if (msg.type === "chat" && !chat.isGroup && !msg.hasMedia) {
        let messageToSend = await templateSelector(contact)
        await handleInvalidOption(wbot, contact, messageToSend, ticket, storeId)
        const sentMessage = await wbot.sendMessage(
          `${contact.number}@c.us`,
          messageToSend.message
        );
        await verifyMessageSent(sentMessage, ticket, contact, messageToSend.id, storeId);
        await verifyQueue(wbot, ticket, messageToSend.queueId)
      }
    }

    if (msg.fromMe && ticket.status === "open") {
      verifyMessageSent(msg, ticket, contact, 1, storeId)
    }

    if (!msg.fromMe && ticket.status === "open") {
      verifyMessage(msg, ticket, contact, storeId)
    }
    if (msg.hasMedia) {
      verifyMediaMessage(msg, ticket, storeId)
    }
    if (
      !ticket.queue &&
      !chat.isGroup &&
      !msg.fromMe &&
      !ticket.userId &&
      whatsapp.queues.length >= 1
    ) {
      await verifyQueue(wbot, ticket, null);
    }

    if (msg.type === "vcard") {
      try {
        const array = msg.body.split("\n");
        const obj = [];
        let contact = "";
        for (let index = 0; index < array.length; index++) {
          const v = array[index];
          const values = v.split(":");
          for (let ind = 0; ind < values.length; ind++) {
            if (values[ind].indexOf("+") !== -1) {
              obj.push({ number: values[ind] });
            }
            if (values[ind].indexOf("FN") !== -1) {
              contact = values[ind + 1];
            }
          }
        }
        for await (const ob of obj) {
          const cont = await CreateContactService({
            storeId: storeId,
            name: contact,
            number: ob.number.replace(/\D/g, "")
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

  } catch (err) {
    Sentry.captureException(err);
    logger.error(`Error handling whatsapp message: Err: ${err}`);
  }
};

const handleMsgAck = async (msg: WbotMessage, ack: MessageAck) => {
  await new Promise(r => setTimeout(r, 500));

  const io = getIO();

  try {
    const messageToUpdate = await Message.findByPk(msg.id.id, {
      include: [
        "contact",
        {
          model: Message,
          as: "quotedMsg",
          include: ["contact"]
        }
      ]
    });
    if (!messageToUpdate) {
      return;
    }
    await messageToUpdate.update({ ack });

    io.to(messageToUpdate.ticketId.toString()).emit("appMessage", {
      action: "update",
      message: messageToUpdate
    });
  } catch (err) {
    Sentry.captureException(err);
    logger.error(`Error handling message ack. Err: ${err}`);
  }
};

const wbotMessageListener = (wbot: Session, req: Request): void => {
  wbot.on("message_create", async msg => {
    handleMessage(msg, wbot, req);
  });

  wbot.on("media_uploaded", async msg => {
    handleMessage(msg, wbot, req);
  });

  wbot.on("message_ack", async (msg, ack) => {
    handleMsgAck(msg, ack);
  });

};

export { wbotMessageListener, handleMessage };