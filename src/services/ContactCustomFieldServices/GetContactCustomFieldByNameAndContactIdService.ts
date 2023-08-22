import AppError from "../../errors/AppError"
import ContactCustomField from "../../models/ContactCustomField"

const GetContactCustomFieldByNameAndContactIdService = async (name: string, contactId: number): Promise<ContactCustomField> => {
    const customField = await ContactCustomField.findOne({
        where: { name, contactId }
    })
    if (!customField) {
        throw new AppError("ERR_FIELD_DOES_NOT_EXISTS")
    }
    return customField
}

export default GetContactCustomFieldByNameAndContactIdService;