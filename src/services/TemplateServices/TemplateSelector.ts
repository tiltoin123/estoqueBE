import Contact from "../../models/Contact"
import GetLastMessageReceived from "../MessageServices/GetLastMessageReceived"
import GetLastMessageSent from "../MessageServices/GetLastMessageSent"
import ListTemplatesService from "./ListTemplatesService"
import ShowTemplatesService from "./ShowTemplatesService"
import { Message as WbotMessage } from "whatsapp-web.js";

const templateSelector = async (contact: Contact) => {

    let lastReceivedMessage = await GetLastMessageReceived(contact.id)
    let lastSentMessage = await GetLastMessageSent(contact.number)
    let lastSentTemplate = await ShowTemplatesService(lastSentMessage ? lastSentMessage.templateId : 1)
    let templates = await ListTemplatesService()

    console.log("last Sent Message", lastSentMessage?.templateId)
    if (lastReceivedMessage && lastSentMessage) {
        console.log("passou o primeiro if do templateSelector")
        for (let i = 0; i < templates.length; i++) {
            let testTemplate = templates[i];
            let currentCondition = testTemplate.condition ? testTemplate.condition : false;
            let words = lastReceivedMessage.body.toLowerCase().split(' ');
            if (testTemplate.lastMessage === lastSentTemplate.id || testTemplate.id === lastSentTemplate.nextMessage) {
                if (!currentCondition) {
                    console.log("nao tem condition")
                    return testTemplate
                }
                let conditionWords = currentCondition.toLowerCase().split(' ');
                let match = conditionWords.some(conditionWord => words.some(word => word === conditionWord)) ? true : false;
                console.log("words", words)
                if (match) {
                    console.log("tem condition");
                    return testTemplate;
                }
            }
        }
    }
    console.log("nao selecionou nada")
    return templates[0];
}

export default templateSelector;