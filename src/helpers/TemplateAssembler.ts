import Contact from "../models/Contact";
import Template from "../models/Template";
import ListTemplateControlsService from "../services/TemplateControlsServices/ListTemplateControlsService";
import interpolatedTextReplacer from "./InterpolatedTextReplacer";


const templateAssembler = async (template: Template, contact: Contact): Promise<Template> => {

    let templateControls = await ListTemplateControlsService(template.id)
    if (templateControls) {
        template.message = template.message + "\n"
        templateControls.forEach(element => {
            template.message += element.choice + " - " + element.valor + "\n"
        });
    }
    const completeTemplate = await interpolatedTextReplacer(template, contact)

    return completeTemplate ? completeTemplate : template
}

export default templateAssembler;


