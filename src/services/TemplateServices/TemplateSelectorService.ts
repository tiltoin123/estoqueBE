import {
    Contact as WbotContact,
    Message as WbotMessage,
    MessageAck,
    Client
} from "whatsapp-web.js";
import ListTemplatesService from "./ListTemplatesService";
import ShowTemplatesService from "./ShowTemplatesService";

class MessageSelector {
    constructor(
    ) { }
    async selectTemplateById(templateId: number) {
        const template = await ShowTemplatesService(templateId)
        if (!template) {

        }
        return template
    }

    async listTemplates() {
        const storeId = 1
        const templateIndex = await ListTemplatesService(storeId)
        return templateIndex
    }
}
export default MessageSelector;