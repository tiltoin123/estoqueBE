import AppError from "../../errors/AppError";
import TimeOut from "../../models/TimeOut";

const UpdateTimeOutService = async (
    storeId: number,
    contactId: number,
): Promise<TimeOut> => {
    const updatedTimeOut = await TimeOut.update(
        {
            contactId,
            storeId
        },
        {
            where: {
                storeId,
                contactId
            },
            returning: true
        }
    );

    if (updatedTimeOut[0] === 0) {
        throw new AppError("ERR_UPDATE_FAILED");
    }

    const updatedRecord = updatedTimeOut[1][0];
    return updatedRecord;
};

export default UpdateTimeOutService;
