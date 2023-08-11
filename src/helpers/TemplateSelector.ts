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
=======

    console.log(templates[0].message)
>>>>>>> e2755df (model templatecontrols quebrado)
    if (lastReceivedMessage && lastSentMessage) {
        for (let i = 0; i < templates.length; i++) {
            let testTemplate = templates[i];
            let currentCondition = testTemplate.condition ? testTemplate.condition : false;
            let words = lastReceivedMessage.body.toLowerCase().split(' ');
            if (testTemplate.lastMessage === lastSentTemplate.id) {
                if (!currentCondition) {
                    console.log("sem condition", testTemplate.id)
                    return await templateAssembler(testTemplate);
                }
                let conditionWords = currentCondition.toLowerCase().split(' ');
                let match = conditionWords === words ? true : false;
                if (match) {
                    console.log("com condition", testTemplate.id)
                    return await templateAssembler(testTemplate);
                }
            }
        }
    }
    console.log("primeira mensagem", templates[0].id)
    return await templateAssembler(templates[0]);
}

export default templateSelector;