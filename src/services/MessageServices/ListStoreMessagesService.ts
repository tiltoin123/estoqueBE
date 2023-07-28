import AppError from "../../errors/AppError";
import Message from "../../models/Message";

const ListStoreMessagesService = async (
    storeId: number
): Promise<Message[]> => {
    const messages = await Message.findAll({
        where: {
            storeId: storeId
        }
    })
    if (!messages) {
        throw new AppError("ERR_NO_USER_FOUND", 404)
    }
    return messages
}

export default ListStoreMessagesService;