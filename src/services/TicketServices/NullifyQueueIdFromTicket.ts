import Ticket from "../../models/Ticket";

const NullifyQueueIdFromTicket = async (id: number) => {
    try {
        const [updatedRowsCount] = await Ticket.update(
            { queueId: null },
            {
                where: {
                    id: id
                }
            }
        );

        return updatedRowsCount;
    } catch (error) {
        throw error;
    }
};

export default NullifyQueueIdFromTicket;
