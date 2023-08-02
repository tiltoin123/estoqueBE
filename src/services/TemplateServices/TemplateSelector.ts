import Contact from "../../models/Contact"
import GetLastMessageReceived from "../MessageServices/GetLastMessageReceived"
import GetLastMessageSent from "../MessageServices/GetLastMessageSent"
import ListTemplatesService from "./ListTemplatesService"
import ShowTemplatesService from "./ShowTemplatesService"

const templateSelector = async (contact: Contact) => {

    let lastReceivedMessage = await GetLastMessageReceived(contact)
    let templates = await ListTemplatesService(contact.storeId)
    let lastSentMessage = await GetLastMessageSent(contact)
    let lastSentTemplate = await ShowTemplatesService(lastSentMessage ? lastSentMessage.templateId : 1)
    //console.log("ultima recebida", lastReceivedMessage?.body)
    //console.log("contact", contact.id, contact.storeId)
    //console.log("lastSentMessage", lastSentMessage)
    console.log(contact)
    console.log("last Sent template", lastSentMessage?.body)
    if (lastReceivedMessage && lastSentMessage) {
        for (let i = 0; i < templates.length; i++) {
            let testTemplate = templates[i];
            let currentCondition = testTemplate.condition ? testTemplate.condition : false;
            let words = lastReceivedMessage.body.toLowerCase().split(' ');
            if (testTemplate.lastMessage === lastSentTemplate.id || testTemplate.id === lastSentTemplate.nextMessage) {
                if (!currentCondition) {
                    return testTemplate
                }
                let conditionWords = currentCondition.toLowerCase().split(' ');
                let match = conditionWords.some(conditionWord => words.some(word => word === conditionWord)) ? true : false;
                if (match) {
                    return testTemplate;
                }
            }
        }
    }
    return templates[0];
}

export default templateSelector;