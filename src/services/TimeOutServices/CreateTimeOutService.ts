import TimeOut from "../../models/TimeOut";

const CreateTimeOutService = async (
    storeId: number,
    contactId: number
): Promise<TimeOut> => {

    const timeOut = await TimeOut.create(
        {
            contactId,
            storeId,
        }
    )
    return timeOut
}

export default CreateTimeOutService;