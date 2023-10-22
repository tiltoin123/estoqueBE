import { Request, Response } from "express";
import { getIO } from "../libs/socket";
import CreateQueueService from "../services/QueueService/CreateQueueService";
import DeleteQueueService from "../services/QueueService/DeleteQueueService";
import ListQueuesService from "../services/QueueService/ListQueuesService";
import ShowQueueService from "../services/QueueService/ShowQueueService";
import UpdateQueueService from "../services/QueueService/UpdateQueueService";
import ListStoreAiService from "../services/StoreAiServices.ts/ListStoreAiService";

export const index = async (req: Request, res: Response): Promise<Response> => {
  const storeId = req.user.storeId
  const queues = await ListQueuesService(storeId);

  return res.status(200).json(queues);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { name, color, greetingMessage, storeAiId } = req.body;
  const storeId = req.user.storeId
  const queue = await CreateQueueService(storeId, { name, color, greetingMessage, storeAiId });
  const io = getIO();
  io.emit("queue", {
    action: "update",
    queue
  });

  return res.status(200).json(queue);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { queueId } = req.params;
  const storeId = req.user.storeId
  const queue = await ShowQueueService(queueId);
  const { storeAi } = await ListStoreAiService({ storeId })

  return res.status(200).json({ queue, storeAi });
  //return res.status(200).json(queue);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { queueId } = req.params;
  const queue = await UpdateQueueService(queueId, req.body);

  const io = getIO();
  io.emit("queue", {
    action: "update",
    queue
  });

  return res.status(201).json(queue);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { queueId } = req.params;

  await DeleteQueueService(queueId);

  const io = getIO();
  io.emit("queue", {
    action: "delete",
    queueId: +queueId
  });

  return res.status(200).send();
};
