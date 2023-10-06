import Contact from "../models/Contact";
import Template from "../models/Template";
import GetContactCustomFieldByNameAndContactIdService from "../services/ContactCustomFieldServices/GetContactCustomFieldByNameAndContactIdService";

const interpolatedTextReplacer = async (template: Template, contact: Contact): Promise<Template | null> => {

    let contactCustomField = await GetContactCustomFieldByNameAndContactIdService("nome completo", contact.id);
    const contactFullName = contactCustomField ? contactCustomField.value : null
    if (contactFullName == null)
        return null

    const property: any = {
        contactFullName
    };
    const regex = /\${(.*?)}/g;
    template.message = template.message.replace(regex, (match, interpolatedValue) => {
        if (interpolatedValue in property) {
            return property[interpolatedValue];
        }
        return match;
    });
    return template;
};

export default interpolatedTextReplacer;
