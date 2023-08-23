import Contact from "../models/Contact"
import GetLastMessageReceived from "../services/MessageServices/GetLastMessageReceived"
import GetLastMessageSent from "../services/MessageServices/GetLastMessageSent"
import ListTemplatesService from "../services/TemplateServices/ListTemplatesService"
import ShowTemplatesService from "../services/TemplateServices/ShowTemplatesService"
import templateAssembler from "./TemplateAssembler";
import CountTemplateControlsService from "../services/TemplateControlsServices/CountTemplateControlsService"

const templateSelector = async (contact: Contact) => {
    let lastReceivedMessage = await GetLastMessageReceived(contact)
    let templates = await ListTemplatesService(contact.storeId)
    let lastSentMessage = await GetLastMessageSent(contact)
    let lastSentTemplate = await ShowTemplatesService(lastSentMessage ? lastSentMessage.templateId : 1)
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
                if (conditionWord) {
                    let countControls = await CountTemplateControlsService(lastSentTemplate.id)
                    const regex = /^[12345679]+$/;
                    const stringToTest = "12345679";
                    const isMatch = regex.test(stringToTest);
                    const wordValue = parseInt(words)
                    if (conditionWord === words) {
                        return await templateAssembler(testTemplate);
                    }
                    if (isMatch === false || wordValue > countControls) {
                        return await templateAssembler(lastSentTemplate)
                    }
                }
            }
        }
    }
    return await templateAssembler(templates[0]);

}

export default templateSelector;