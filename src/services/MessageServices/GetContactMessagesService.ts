import AppError from "../../errors/AppError";
import Message from "../../models/Message";

const GetContactMessagesService = async (
    ticketId: number,
    limit?: number
): Promise<Message[]> => {
    let nMsgs = limit ? limit : 10
    const messages = await Message.findAll({
        where: {
            ticketId: ticketId
        }, limit: nMsgs,
        order: [["createdAt", "DESC"]]
    })
    if (!messages) {
        throw new AppError("ERR_NO_USER_FOUND", 404)
    }
    return messages
}

export default GetContactMessagesService;