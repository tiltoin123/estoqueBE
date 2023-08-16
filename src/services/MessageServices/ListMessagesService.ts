import { Op } from "sequelize";
import AppError from "../../errors/AppError";
import Message from "../../models/Message";
import Ticket from "../../models/Ticket";
import ShowTicketService from "../TicketServices/ShowTicketService";

interface Request {
  storeId: number;
  ticketId: string;
  pageNumber?: string;
}

interface Response {
  messages: Message[];
  ticket: Ticket;
  count: number;
  hasMore: boolean;
}

const ListMessagesService = async ({
  storeId,
  pageNumber = "1",
  ticketId
}: Request): Promise<Response> => {
  const ticket = await ShowTicketService(ticketId);

  if (!ticket) {
    throw new AppError("ERR_NO_TICKET_FOUND", 404);
  }
  const limit = 20;
  const offset = limit * (+pageNumber - 1);

  const { count, rows: messages } = await Message.findAndCountAll({
    where: { ticketId },
    limit,
    include: [
      "contact",
      {
        model: Message,
        as: "quotedMsg",
        include: ["contact"]
      }
    ],
    offset,
    order: [["createdAt", "DESC"]]
  });

  const hasMore = count > offset + messages.length;

  return {
    messages: messages.reverse(),
    ticket,
    count,
    hasMore
  };
};

export default ListMessagesService;
