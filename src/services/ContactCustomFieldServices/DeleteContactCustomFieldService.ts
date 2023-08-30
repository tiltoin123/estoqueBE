import AppError from "../../errors/AppError"
import ContactCustomField from "../../models/ContactCustomField"

const DeleteContactCustomFieldService = async (name: string, contactId: number): Promise<void> => {
    const customField = await ContactCustomField.findOne({
        where: { name, contactId }
    })

    if (!customField) {
        throw new AppError("ERR_NO_CUSTOM_CONTACT_FIELD_FOUND", 404);
    }
    await customField.destroy()
}

export default DeleteContactCustomFieldService;