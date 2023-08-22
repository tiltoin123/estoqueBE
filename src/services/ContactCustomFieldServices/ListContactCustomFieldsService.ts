import AppError from "../../errors/AppError"
import ContactCustomField from "../../models/ContactCustomField"

const ListContactCustomFieldsService = async (contactId: number): Promise<ContactCustomField[]> => {
    const customFields = await ContactCustomField.findAll({
        where: { contactId }
    })
    if (!customFields) {
        throw new AppError("ERR_CUSTOM_CONTACT_FIELDS_NOT_FOUND")
    }
    return customFields
}

export default ListContactCustomFieldsService;