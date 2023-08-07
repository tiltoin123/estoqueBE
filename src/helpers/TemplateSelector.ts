import Contact from "../models/Contact"
import GetLastMessageReceived from "../services/MessageServices/GetLastMessageReceived"
import GetLastMessageSent from "../services/MessageServices/GetLastMessageSent"
import ListTemplatesService from "../services/TemplateServices/ListTemplatesService"
import ShowTemplatesService from "../services/TemplateServices/ShowTemplatesService"
import templateAssembler from "./TemplateAssembler";

const templateSelector = async (contact: Contact) => {
    let lastReceivedMessage = await GetLastMessageReceived(contact)
    let templates = await ListTemplatesService(contact.storeId)
    let lastSentMessage = await GetLastMessageSent(contact)
    let lastSentTemplate = await ShowTemplatesService(lastSentMessage ? lastSentMessage.templateId : 1)
<<<<<<< HEAD
    if (lastReceivedMessage && lastSentMessage) {
        for (let i = 0; i < templates.length; i++) {
            let testTemplate = templates[i];
            let currentCondition = testTemplate.condition ? testTemplate.condition.toString() : false;
            let conditionWord = currentCondition ? currentCondition.toLowerCase() : false
            let words = lastReceivedMessage.body.toString().toLowerCase();
            if (testTemplate.lastMessage == lastSentTemplate.id) {
                if (!conditionWord) {
                    return await templateAssembler(testTemplate);
                }
                if (conditionWord === words) {
                    return await templateAssembler(testTemplate);
=======

    if (lastReceivedMessage && lastSentMessage) {
        for (let i = 0; i < templates.length; i++) {
            let testTemplate = templates[i];
            let currentCondition = testTemplate.condition ? testTemplate.condition : false;
            let words = lastReceivedMessage.body.toLowerCase().split(' ');
            if (testTemplate.lastMessage === lastSentTemplate.id || testTemplate.id === lastSentTemplate.nextMessage) {
                if (!currentCondition) {
                    return templateAssembler(testTemplate);
                }
                let conditionWords = currentCondition.toLowerCase().split(' ');
                let match = conditionWords.some(conditionWord => words.some(word => word === conditionWord)) ? true : false;
                if (match) {
                    return templateAssembler(testTemplate);
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)
                }
            }
        }
    }
<<<<<<< HEAD
    return await templateAssembler(templates[0]);
=======
    return templateAssembler(templates[0]);
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)
}

export default templateSelector;