import Contact from "../models/Contact"
import GetLastMessageReceived from "../services/MessageServices/GetLastMessageReceived"
import GetLastMessageSent from "../services/MessageServices/GetLastMessageSent"
import ListTemplatesService from "../services/TemplateServices/ListTemplatesService"
import ShowTemplatesService from "../services/TemplateServices/ShowTemplatesService"
import templateAssembler from "./TemplateAssembler";
import CountTemplateControlsService from "../services/TemplateControlsServices/CountTemplateControlsService"
import GetContactCustomFieldByNameAndContactIdService from "../services/ContactCustomFieldServices/GetContactCustomFieldByNameAndContactIdService"

const templateSelector = async (contact: Contact) => {
    let lastReceivedMessage = await GetLastMessageReceived(contact)
    let templates = await ListTemplatesService(contact.storeId)
    let lastSentMessage = await GetLastMessageSent(contact)
    let lastSentTemplate = await ShowTemplatesService(lastSentMessage ? lastSentMessage.templateId : 1)
    let contactFname = await GetContactCustomFieldByNameAndContactIdService("nome completo", contact.id)
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
                    const match = /^\d+$/.test(words) ? parseInt(words) : false;
                    const wordValue = parseInt(words)
                    if (conditionWord === words) {
                        return await templateAssembler(testTemplate);
                    }
                    if (!match || countControls < match) {
                        return await templateAssembler(lastSentTemplate)
                    }
                }
            }
        }
    }
    if (contactFname && contactFname.name !== "nome completo") {
        return await templateAssembler(templates[0]);
    }
    return await templateAssembler(templates[2]);
}

export default templateSelector;