import TimeOut from "../../models/TimeOut";
import AppError from "../../errors/AppError";

const ListTimeOutService = async (
    storeId: number,
): Promise<TimeOut[] | null> => {

    const timeOuts = await TimeOut.findAll({
        where: {
            storeId
        }
    });

    if (timeOuts.length === 0) {
        return null
    }
    return timeOuts;
};

export default ListTimeOutService;
