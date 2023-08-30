import AppError from "../../errors/AppError";
import TimeOut from "../../models/TimeOut";


const DeleteTimeOutService = async (
    id: number
) => {
    const timeOut = await TimeOut.findOne({
        where: { id }
    }
    )

    if (!timeOut) {
        throw new AppError("ERR_NO_TICKET_FOUND", 404);
    }

    await timeOut.destroy()

    return timeOut
}

export default DeleteTimeOutService;