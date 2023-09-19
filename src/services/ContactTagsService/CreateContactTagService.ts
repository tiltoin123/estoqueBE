import Contact from "../../models/Contact";
import ContactTags from "../../models/ContactTags";

const CreateContactTagService = async (
    contact: Contact,
    tagName: string
): Promise<ContactTags> => {
    const contactTag = await ContactTags.create({

        contactId: contact.id,
        tagName,
        storeId: contact.storeId
    })
    return contactTag
}

export default CreateContactTagService;