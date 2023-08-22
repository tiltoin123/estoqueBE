import Contact from "../models/Contact"
import GetLastMessageReceived from "../services/MessageServices/GetLastMessageReceived"
import GetLastMessageSent from "../services/MessageServices/GetLastMessageSent"
import ListTemplatesService from "../services/TemplateServices/ListTemplatesService"
import ShowTemplatesService from "../services/TemplateServices/ShowTemplatesService"
import templateAssembler from "./TemplateAssembler";
import ListTemplateControlsService from "../services/TemplateControlsServices/ListTemplateControlsService"
import SaveOrUpdateContactFullName from "./SaveOrUpdateContactFullName"
import GetContactFullNameService from "../services/ContactCustomFieldServices/GetContactFullNameService"

const templateSelector = async (contact: Contact) => {
    let lastReceivedMessage = await GetLastMessageReceived(contact)
    let templates = await ListTemplatesService(contact.storeId)
    let lastSentMessage = await GetLastMessageSent(contact)
    let lastSentTemplate = await ShowTemplatesService(lastSentMessage ? lastSentMessage.templateId : 1)
    /*     let customFields = await GetContactFullNameService(contact.id)
        let fullName = customFields ? customFields : false */
    if (lastReceivedMessage && lastSentMessage) {
        /*         console.log("fullname", fullName)
                if (!fullName) {
                    console.log("lasttemplateId", lastSentTemplate.id, typeof (lastSentTemplate.id))
                    if (lastSentTemplate.id === 24) {
                        let newFullName = lastReceivedMessage.body.toString()
                        let contactId = contact.id
                        console.log("tentou atualizar", newFullName, "contactID", contactId)
                        await SaveOrUpdateContactFullName(contactId, newFullName)
                        return await templateAssembler(templates[24])
                    }
                    return await templateAssembler(templates[23])
                } */
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
                    let countOptions = await ListTemplateControlsService(lastSentTemplate.id)
                    let count = countOptions.length
                    let countControls = count.toString()
                    console.log("opções", JSON.stringify(countOptions, null, 2))
                    if (conditionWord === words) {
                        return await templateAssembler(testTemplate);
                    }
                    if (conditionWord !== words && words === countControls) {
                        console.log("conditionWord última opção do template?", conditionWord)
                        console.log("words input do usuario", words)
                        console.log("countControls total de opções possiveis", countControls)
                        return await templateAssembler(lastSentTemplate)
                    }
                }
            }
        }
    }
    return await templateAssembler(templates[0]);

}

export default templateSelector;