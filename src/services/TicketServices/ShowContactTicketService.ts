import Ticket from "../../models/Ticket";
import AppError from "../../errors/AppError";
import { Op } from "sequelize";

const ShowContactTicketService = async (contactId: number): Promise<Ticket> => {
    const ticket = await Ticket.findOne({
        where: {
            contactId,
            status: "pending",
            queueId: {
                [Op.gte]: 0,
            }
        }
    });

    if (!ticket) {
        throw new AppError("ERR_NO_TICKET_FOUND", 404);
    }

    return ticket;
};

export default ShowContactTicketService;
