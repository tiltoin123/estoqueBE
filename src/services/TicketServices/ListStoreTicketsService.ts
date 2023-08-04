import AppError from "../../errors/AppError";
import Ticket from "../../models/Ticket";

const ListStoreTicketsService = async (
    storeId: number
): Promise<Ticket[]> => {
    const tickets = await Ticket.findAll({
        where: {
            storeId: storeId
        }
    })
    if (!tickets) {
        throw new AppError("ERR_NO_USER_FOUND", 404)
    }
    return tickets
}

export default ListStoreTicketsService;