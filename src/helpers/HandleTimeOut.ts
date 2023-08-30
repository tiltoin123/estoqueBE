import Contact from "../models/Contact"
import Ticket from "../models/Ticket"
import ListStoreTicketsService from "../services/TicketServices/ListStoreTicketsService"
import ShowContactTicketService from "../services/TicketServices/ShowContactTicketService"
import CreateOrUpdateTimeOutService from "../services/TimeOutServices/CreateOrUpdateTimeOutService"
import DeleteTimeOutService from "../services/TimeOutServices/DeleteTimeOutService"
import GetTimeOutConfigService from "../services/TimeOutServices/GetTimeOutConfigService"
import ListTimeOutService from "../services/TimeOutServices/ListStoreTimeOutService"
import ShowTimeOutService from "../services/TimeOutServices/ShowTimeOutService"

const HandleTimeOut = async (contact: Contact, ticket: Ticket): Promise<string | undefined> => {
    const config = await GetTimeOutConfigService(contact.storeId)
    if (config.status) {
        const { minutesDuration, notice } = config

        if (ticket.status === "pending" && ticket.queueId !== null) {
            const createdTimeOut = await CreateOrUpdateTimeOutService(ticket.storeId, ticket.contactId)
        }
        const timeOuts = await ListTimeOutService(contact.storeId)
        if (timeOuts) {
            for (let i = 0; i < timeOuts.length; i++) {
                const timeOut = timeOuts[i];
                const date = new Date(timeOut.createdAt)
                const date2 = new Date(timeOut.updatedAt)
                const timeOutDuration = date2.getTime() - date.getTime()
                const miliSecondsDuration = minutesDuration * 60000
                if (miliSecondsDuration <= timeOutDuration) {
                    const deletedTimeOut = await DeleteTimeOutService(timeOut.id)
                }
            }
        }
        const isUserTimedOUt = await ShowTimeOutService(contact.storeId, contact.id)
        if (isUserTimedOUt) {
            return notice
        }
    }

}
export default HandleTimeOut;