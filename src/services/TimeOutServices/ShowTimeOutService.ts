import TimeOut from "../../models/TimeOut";
import AppError from "../../errors/AppError";

const ShowTimeOutService = async (
    storeId: number,
    contactId: number,
): Promise<TimeOut> => {
    let timeOut: TimeOut | null;

    timeOut = await TimeOut.findOne({
        where: {
            storeId,
            contactId
        }
    });


    if (!timeOut) {
        throw new AppError("ERR_NO_TICKET_FOUND", 404);
    }

    return timeOut;
};

export default ShowTimeOutService;
