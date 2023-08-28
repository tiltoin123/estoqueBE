import Contact from "../models/Contact";
import ListStoreTicketsService from "../services/TicketServices/ListStoreTicketsService";
import CreateOrUpdateTimeOutService from "../services/TimeOutServices/CreateOrUpdateTimeOutService";
import DeleteTimeOutService from "../services/TimeOutServices/DeleteTimeOutService";
import GetTimeOutConfigService from "../services/TimeOutServices/GetTimeOutConfigService";
import ListTimeOutService from "../services/TimeOutServices/ListStoreTimeOutService";
import ShowTimeOutService from "../services/TimeOutServices/ShowTimeOutService";
import TimeOutConfig from "../models/TimeOutConfig";

const createPendingTimeouts = async (storeTickets: any[]) => {
    for (const ticket of storeTickets) {
        const timeOutExist = await ShowTimeOutService(ticket.storeId, ticket.contactId);
        if (ticket.status === "pending" && !isNaN(ticket.queueId) && !timeOutExist) {
            await CreateOrUpdateTimeOutService(ticket.storeId, ticket.contactId);
        }
    }
};

const handleExpiredTimeouts = async (timeOuts: any[], minutesDuration: number) => {
    const miliSecondsDuration = minutesDuration * 60000;
    for (const timeOut of timeOuts) {
        const date = new Date(timeOut.createdAt);
        const date2 = new Date(timeOut.updatedAt);
        const timeOutDuration = date2.getTime() - date.getTime();
        if (miliSecondsDuration <= timeOutDuration) {
            await DeleteTimeOutService(timeOut.id);
        }
    }
};

const HandleTimeOut = async (contact: Contact) => {
    const config: TimeOutConfig = await GetTimeOutConfigService(contact.storeId);

    if (config.status) {
        const { minutesDuration, notice } = config;

        const storeTickets = await ListStoreTicketsService(contact.storeId);
        await createPendingTimeouts(storeTickets);

        const timeOuts = await ListTimeOutService(contact.storeId);
        await handleExpiredTimeouts(timeOuts, minutesDuration);
    }
};

export default HandleTimeOut;
