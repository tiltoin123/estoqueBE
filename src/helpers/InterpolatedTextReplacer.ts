import Contact from "../models/Contact";
import Template from "../models/Template";
import GetContactCustomFieldByNameAndContactIdService from "../services/ContactCustomFieldServices/GetContactCustomFieldByNameAndContactIdService";
import templateAssembler from "./TemplateAssembler";

const interpolatedTextReplacer = async (template: Template, contact: Contact): Promise<Template | null> => {

    let contactCustomField = await GetContactCustomFieldByNameAndContactIdService("nome completo", contact.id);
    const contactFullName = contactCustomField ? contactCustomField.value : null
    //console.log(contactFullName)
    if (contactFullName == null)
        return null

    const property: any = {
        contactFullName
    };
    const regex = /\${(.*?)}/g;
    template.message = template.message.replace(regex, (match, interpolatedValue) => {
        if (interpolatedValue in property) {
            console.log("retorno na property", property[interpolatedValue])
            return property[interpolatedValue];
        }
        console.log("retorno no match")
        return match;
    });
    console.log("retorno no template", template.message)
    return template;
};

export default interpolatedTextReplacer;
