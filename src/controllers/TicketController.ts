import { Request, Response } from "express";
import { getIO } from "../libs/socket";

import CreateTicketService from "../services/TicketServices/CreateTicketService";
import DeleteTicketService from "../services/TicketServices/DeleteTicketService";
import ListTicketsService from "../services/TicketServices/ListTicketsService";
import ShowTicketService from "../services/TicketServices/ShowTicketService";
import UpdateTicketService from "../services/TicketServices/UpdateTicketService";
import NullifyQueueIdFromTicket from "../services/TicketServices/NullifyQueueIdFromTicket";
import DeleteTimeOutService from "../services/TimeOutServices/DeleteTimeOutService";
import ListContactTagsService from "../services/ContactTagsService/ListContactTagsService";
import CreateContactTagService from "../services/ContactTagsService/CreateContactTagService";
import ShowQueueService from "../services/QueueService/ShowQueueService";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
  status: string;
  date: string;
  showAll: string;
  withUnreadMessages: string;
  queueIds: string;
};

interface TicketData {
  contactId: number;
  status: string;
  queueId: number;
  userId: number;
}

export const index = async (req: Request, res: Response): Promise<Response> => {
  const {
    pageNumber,
    status,
    date,
    searchParam,
    showAll,
    queueIds: queueIdsStringified,
    withUnreadMessages
  } = req.query as IndexQuery;

  const userId = req.user.id;
  const storeId = req.user.storeId

  let queueIds: number[] = [];

  if (queueIdsStringified) {
    queueIds = JSON.parse(queueIdsStringified);
  }

  const { tickets, count, hasMore } = await ListTicketsService({
    storeId,
    searchParam,
    pageNumber,
    status,
    date,
    showAll,
    userId,
    queueIds,
    withUnreadMessages
  });
  let contactIds: number[] = []
  tickets.forEach(ticket => {
    contactIds.push(ticket.contactId)
  });
  const tags = await ListContactTagsService(contactIds)
  //console.log(tags)
  return res.status(200).json({ tickets, count, hasMore, tags });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { contactId, status, userId }: TicketData = req.body;
  const storeId = req.user.storeId
  const ticket = await CreateTicketService({ contactId, status, userId, storeId });

  const io = getIO();
  io.to(ticket.status).emit("ticket", {
    action: "update",
    ticket
  });

  return res.status(200).json(ticket);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  console.log(req.params)
  const contact = await ShowTicketService(ticketId);

  return res.status(200).json(contact);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { ticketId } = req.params;
  const ticketData: TicketData = req.body;

  const { ticket, oldQueueId } = await UpdateTicketService({
    ticketData,
    ticketId
  });

  if (oldQueueId !== ticket.queueId) {
    const queue = await ShowQueueService(ticket.queueId)
    await CreateContactTagService(ticket.contactId, queue.name, ticket.storeId)
  }

  if (ticket.status === "closed") {

    const ticketDataBase = await ShowTicketService(ticket.id)

    if (ticketDataBase && ticketDataBase.id) {
      await NullifyQueueIdFromTicket(ticket.id)

      await DeleteTimeOutService(req.user.storeId, ticketDataBase.contactId)
    }

  }

  return res.status(200).json(ticket);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { ticketId } = req.params;

  const ticket = await DeleteTicketService(ticketId);

  const io = getIO();
  io.to(ticket.status)
    .to(ticketId)
    .to("notification")
    .emit("ticket", {
      action: "delete",
      ticketId: +ticketId
    });

  return res.status(200).json({ message: "ticket deleted" });
};
