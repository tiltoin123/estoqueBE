import Queue from "../../models/Queue";
import StoreAi from "../../models/StoreAi";

const ListQueuesService = async (storeId: number): Promise<Queue[]> => {
  const queues = await Queue.findAll({
    where: { storeId },
    include: [{
      model: StoreAi,
      as: "storeAi",
      attributes: ["id", "name"],
      required: false,
      duplicating: false,
    },],
    order: [["name", "ASC"]],
  });

  return queues;
};

export default ListQueuesService;
