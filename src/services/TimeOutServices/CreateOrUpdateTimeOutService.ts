import TimeOut from "../../models/TimeOut";
import AppError from "../../errors/AppError";
import ShowTimeOutService from "./ShowTimeOutService";
import UpdateTimeOutService from "./UpdateTimeOutService";
import CreateTimeOutService from "./CreateTimeOutService";

const CreateOrUpdateTimeOutService = async (
    storeId: number,
    contactId: number,
): Promise<TimeOut> => {
    try {
        const timeOutExists = await ShowTimeOutService(storeId, contactId);

        if (timeOutExists) {
            const { storeId: existingStoreId, contactId: existingContactId } = timeOutExists;

            const updatedTimeOut = await UpdateTimeOutService(existingStoreId, existingContactId);
            return updatedTimeOut;
        } else {
            const createdTimeOut = await CreateTimeOutService(storeId, contactId);
            return createdTimeOut;
        }
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new AppError("ERR_INTERNAL_SERVER_ERROR", 500);
        }
    }
};

export default CreateOrUpdateTimeOutService;
