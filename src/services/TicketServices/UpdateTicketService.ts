import CheckContactOpenTickets from "../../helpers/CheckContactOpenTickets";
import SetTicketMessagesAsRead from "../../helpers/SetTicketMessagesAsRead";
import { getIO } from "../../libs/socket";
import Ticket from "../../models/Ticket";
import ShowTicketService from "./ShowTicketService";

interface TicketData {
  status?: string;
  userId?: number;
  queueId?: number;
  whatsappId?: number;
}

interface Request {
  ticketData: TicketData;
  ticketId: string | number;
}

interface Response {
  ticket: Ticket;
  oldStatus: string;
  oldUserId: number | undefined;
}

const UpdateTicketService = async ({
  ticketData,
  ticketId
}: Request): Promise<Response> => {
  const { status, userId, queueId, whatsappId } = ticketData;
  console.log("updateticket pas1 @#$@#$@#$@#@#$@#$@#$@#$")
  const ticket = await ShowTicketService(ticketId);
  console.log("updateticket pas2 @#$@#$@#$@#@#$@#$")
  await SetTicketMessagesAsRead(ticket);
  console.log("updateticket pas3 @#$@#$@#$@#@#$@#$")
  if (whatsappId && ticket.whatsappId !== whatsappId) {
    await CheckContactOpenTickets(ticket.contactId, whatsappId);
  }

  const oldStatus = ticket.status;
  console.log("updateticket pas4 @#$@#$@#$@#@#$@#$")
  const oldUserId = ticket.user?.id;

  if (oldStatus === "closed") {
    await CheckContactOpenTickets(ticket.contact.id, ticket.whatsappId);
  }
  console.log("updateticket pas5 @#$@#$@#$@#@#$@#$")
  await ticket.update({
    status,
    queueId,
    userId
  });
  console.log("updateticket pas6 @#$@#$@#$@#@#$@#$")

  if (whatsappId) {
    await ticket.update({
      whatsappId
    });
  }

  await ticket.reload();
  console.log("updateticket pas7 @##$123123123%#$%#")
  const io = getIO();

  if (ticket.status !== oldStatus || ticket.user?.id !== oldUserId) {
    io.to(oldStatus).emit("ticket", {
      action: "delete",
      ticketId: ticket.id
    });
  }


  console.log("updateticket pas8 @456745654#$@#$@#$@#@#$@#$")
  io.to(ticket.status)
    .to("notification")
    .to(ticketId.toString())
    .emit("ticket", {
      action: "update",
      ticket
    });

  return { ticket, oldStatus, oldUserId };
};

export default UpdateTicketService;
