import ContactTags from "../../models/ContactTags";

const ListContactTagsService = async (contactIds: number[]): Promise<ContactTags[] | null> => {
    const contactTags = await ContactTags.findAll({
        where: { contactId: contactIds },
    })

    if (!contactTags)
        return null
    return contactTags
}

export default ListContactTagsService;