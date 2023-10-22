import ContactTags from "../../models/ContactTags";

const CreateContactTagService = async (
    contactId: number,
    tagName: string,
    storeId: number,
): Promise<ContactTags> => {
    const contactTag = await ContactTags.create({

        contactId: contactId,
        tagName,
        storeId: storeId
    })
    return contactTag
}

export default CreateContactTagService;