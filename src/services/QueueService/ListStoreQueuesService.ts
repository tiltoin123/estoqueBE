import AppError from "../../errors/AppError";
import Queue from "../../models/Queue";

const ListStoreQueuesService = async (
    storeId: number
): Promise<Queue[]> => {
    const queues = await Queue.findAll({
        where: {
            storeId: storeId
        }
    })
    if (!queues) {
        throw new AppError("ERR_NO_USER_FOUND", 404)
    }
    return queues
}

export default ListStoreQueuesService;