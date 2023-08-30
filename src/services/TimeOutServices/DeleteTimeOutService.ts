import AppError from "../../errors/AppError";
import TimeOut from "../../models/TimeOut";


const DeleteTimeOutService = async (
    storeId: number,
    contactId: number
) => {
    const timeOut = await TimeOut.findAll({
        where: {  
            contactId: contactId,
            storeId: storeId
        }
    }
    )

    if (!timeOut) {
        throw new AppError("ERR_NO_TICKET_FOUND", 404);
    }

    for (const item of timeOut) {
        await item.destroy();
    }
    

    return timeOut
}

export default DeleteTimeOutService;