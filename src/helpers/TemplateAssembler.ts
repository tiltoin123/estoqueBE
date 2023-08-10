import Template from "../models/Template"
import ListTemplateControlsService from "../services/TemplateControlsServices/ListTemplateControlsService"

const templateAssembler = async (template: Template): Promise<Template> => {
    let templateItems = await ListTemplateControlsService(template.id)
    console.log(templateItems, "templateItems por tempalte")
    if (templateItems) {
        template.message = template.message + "\n"
        templateItems.forEach(element => {
            template.message += element.choice.toString + " - " + element.valor + "\n"
        });
    }
    return template
}

export default templateAssembler;