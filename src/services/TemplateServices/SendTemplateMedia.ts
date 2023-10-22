import fs from "fs";
import { MessageMedia, Message as WbotMessage } from "whatsapp-web.js";
import AppError from "../../errors/AppError";
import GetTicketWbot from "../../helpers/GetTicketWbot";
import Ticket from "../../models/Ticket";

import formatBody from "../../helpers/Mustache";
import ShowTemplatesService from "./ShowTemplatesService";



const SendTemplateMedia = async (
    ticket: Ticket,
    templateId: number,
    body?: string
): Promise<WbotMessage> => {
    try {
        const template = await ShowTemplatesService(templateId)
        const wbot = await GetTicketWbot(ticket);
        const hasBody = body
            ? formatBody(body as string, ticket.contact)
            : undefined;
        //console.log("hasbody", hasBody)1IM6D-1696343927527
        const newMedia = MessageMedia.fromFilePath(/* "C:/git/chatrock/chatrock-api/public/1IM6D-1696343927527.jpeg" ||  */template.mediaContent!)
        //console.log("newmedia", newMedia)
        const sentMessage = await wbot.sendMessage(
            `${ticket.contact.number}@${ticket.isGroup ? "g" : "c"}.us`,
            newMedia,
            {
                caption: hasBody,
                sendAudioAsVoice: true
            }
        );
        await ticket.update({ lastMessage: body || newMedia.filename });

        //fs.unlinkSync(media.path);
        return sentMessage;
    } catch (err) {
        console.log(err);
        throw new AppError("ERR_SENDING_WAPP_MSG");
    }
};

export default SendTemplateMedia;
