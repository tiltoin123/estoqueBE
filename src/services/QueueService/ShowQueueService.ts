import AppError from "../../errors/AppError";
import Queue from "../../models/Queue";
import StoreAi from "../../models/StoreAi";

const ShowQueueService = async (queueId: number | string): Promise<Queue> => {
  const queue = await Queue.findByPk(queueId, {
    include: [
      {
        model: StoreAi,
        as: "storeAi",
        attributes: ["id", "name"],
        required: false,
        duplicating: false,
      },
    ],
  });

  if (!queue) {
    throw new AppError("ERR_QUEUE_NOT_FOUND");
  }

  return queue;
};

export default ShowQueueService;
