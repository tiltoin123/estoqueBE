import Template from "../models/Template"
import ListTemplateControlsService from "../services/TemplateControlsServices/ListTemplateControlsService"

const templateAssembler = async (template: Template): Promise<Template> => {
    let templateControls = await ListTemplateControlsService(template.id)
    if (templateControls) {
        template.message = template.message + "\n"
        templateControls.forEach(element => {
            template.message += element.choice + " - " + element.valor + "\n"
        });
    }
    return template
}

export default templateAssembler;