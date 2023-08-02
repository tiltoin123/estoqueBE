import Queue from "../../models/Queue";

const ListQueuesService = async (storeId: number): Promise<Queue[]> => {
  const queues = await Queue.findAll({ where: { storeId }, order: [["name", "ASC"]] });

  return queues;
};

export default ListQueuesService;
