import TimeOut from "../../models/TimeOut";
import AppError from "../../errors/AppError";

const ListTimeOutService = async (
    storeId: number,
): Promise<TimeOut[]> => {

    const timeOut = await TimeOut.findAll({
        where: {
            storeId
        }
    });


    if (!timeOut) {
        throw new AppError("ERR_NO_TICKET_FOUND", 404);
    }

    return timeOut;
};

export default ListTimeOutService;
