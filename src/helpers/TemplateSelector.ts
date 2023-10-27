import Contact from "../models/Contact"
import GetLastMessageReceived from "../services/MessageServices/GetLastMessageReceived"
import GetLastMessageSent from "../services/MessageServices/GetLastMessageSent"
import ListTemplatesService from "../services/TemplateServices/ListTemplatesService"
import ShowTemplatesService from "../services/TemplateServices/ShowTemplatesService"
import GetContactCustomFieldByNameAndContactIdService from "../services/ContactCustomFieldServices/GetContactCustomFieldByNameAndContactIdService"
import ShowFirstTemplatesService from "../services/TemplateServices/ShowFirstTemplatesService"
import GetFirstControlsSetService from "../services/TemplateControlsServices/GetFirstControlsSetService"
import ListTemplateControlsService from "../services/TemplateControlsServices/ListTemplateControlsService"
import templateAssembler from "./TemplateAssembler"
import GetPenultimateMessageReceived from "../services/MessageServices/GetPenultimateMessageReceived"
import ListStoreLinkService from "../services/StoreLinkService/ListStoreLinkService"


const templateSelector = async (contact: Contact) => {

    let lastReceivedMessage = await GetLastMessageReceived(contact)
    let penultimateMessageReceived = await GetPenultimateMessageReceived(contact)
    let templates = await ListTemplatesService(contact.storeId)
    let lastSentMessage = await GetLastMessageSent(contact)
    let firstMenuId = await GetFirstControlsSetService()
    let firstMessageTemplate = await ShowFirstTemplatesService(contact.storeId)
    let firstMenu = firstMenuId ? await ShowTemplatesService(firstMenuId.templateId) : templates[2]

    let lastSentTemplate = await ShowTemplatesService(lastSentMessage ? lastSentMessage.templateId ?
        lastSentMessage.templateId : firstMenu.id : firstMenu.id)

    let contactFullName = await GetContactCustomFieldByNameAndContactIdService("nome completo", contact.id)
    let templateControls = await ListTemplateControlsService(lastSentMessage ? lastSentMessage.templateId ? lastSentMessage.templateId : null : null)
    let backMenu = templateControls[templateControls.length - 1]//voltar ao menu principal deve ser a última opção disponível
    if (contactFullName && (lastReceivedMessage?.hasLink || penultimateMessageReceived?.hasLink)) {
        const receivedLink = lastReceivedMessage?.hasLink ? lastReceivedMessage.body : penultimateMessageReceived!.body
        const storeLink = await ListStoreLinkService(contact.storeId)
        if (storeLink) {
            for (let i = 0; i < storeLink.length; i++) {
                const linkPattern = new RegExp(`\\b${storeLink[i]}\\b`, 'i');
                if (linkPattern.test(receivedLink)) {

                    console.log(`Correspondência encontrada para storeLink[${i}]: ${storeLink[i]}`);
                }
            }
        }

        return await templateAssembler(templates[6], contact);
    }

    if (lastReceivedMessage && lastSentMessage) {
        let words = lastReceivedMessage.body.toString().toLowerCase();
        if (lastReceivedMessage.body.toString() === backMenu?.choice && backMenu?.backMenu) {
            return await templateAssembler(firstMenu, contact)
        }
        for (let i = 0; i < templates.length; i++) {
            let testTemplate = templates[i];
            let currentCondition = testTemplate.condition ? testTemplate.condition.toString() : false;
            let conditionWord = currentCondition ? currentCondition.toLowerCase() : false

            if (testTemplate.lastMessage == lastSentTemplate.id) {
                if (!conditionWord) {
                    return await templateAssembler(testTemplate, contact);
                }
                if (conditionWord) {
                    let countControls = templateControls.length
                    const match = /^\d+$/.test(words) ? parseInt(words) : false;
                    if (conditionWord === words) {
                        return await templateAssembler(testTemplate, contact);
                    }
                    if (!match || countControls < match) {
                        return await templateAssembler(lastSentTemplate, contact)
                    }
                }
            }
        }
    }
    if (!contactFullName) {
        return await templateAssembler(firstMessageTemplate, contact);
    }
    return await templateAssembler(firstMenu, contact);

}

export default templateSelector;