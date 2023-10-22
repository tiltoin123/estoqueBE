import GetContactMessagesService from "../services/MessageServices/GetContactMessagesService"

const GetBuyerChoices = async (
    ticketId: number
): Promise<any> => {
    const messages = await GetContactMessagesService(ticketId)

    if (messages[0].templateId === 7) {
        //ndeu detalhes
    }

    if (messages[0].templateId === 8) {

    }
}

export default GetBuyerChoices;