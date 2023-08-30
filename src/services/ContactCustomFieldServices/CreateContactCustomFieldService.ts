import AppError from "../../errors/AppError"
import ContactCustomField from "../../models/ContactCustomField"

interface CustomField {
    name: string;
    value: string
}

const CreateContactCustomFieldService = async (
    data: CustomField,
    contactId: number
): Promise<ContactCustomField> => {
    const { name, value } = data

    const fieldExists = await ContactCustomField.findOne({
        where: { name, contactId }
    })

    if (fieldExists) {
        throw new AppError("ERR_FIELD_ALREADY_EXISTS")
    }
    const contactCustomField = await ContactCustomField.create(
        {
            name,
            value,
            contactId
        }
    )
    return contactCustomField
}

export default CreateContactCustomFieldService;