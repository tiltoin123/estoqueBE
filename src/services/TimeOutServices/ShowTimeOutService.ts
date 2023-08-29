import TimeOut from "../../models/TimeOut";
import AppError from "../../errors/AppError";

const ShowTimeOutService = async (
    storeId: number,
    contactId: number,
): Promise<TimeOut | null> => {
    const timeOut = await TimeOut.findOne({
        where: {
            storeId,
            contactId
        }
    });


    if (!timeOut) {
        return null
    }
    return timeOut;
};

export default ShowTimeOutService;
