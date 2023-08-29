import Ticket from "../../models/Ticket";
import AppError from "../../errors/AppError";

const ShowContactTicketService = async (contactId: number): Promise<Ticket | null> => {
    const ticket = await Ticket.findOne({
        where: {
            contactId,
            status: "pending",
        }
    });

    if (!ticket) {
        return null
    }
    return ticket;
};

export default ShowContactTicketService;
