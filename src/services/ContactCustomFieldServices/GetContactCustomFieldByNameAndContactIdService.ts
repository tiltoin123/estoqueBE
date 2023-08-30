import AppError from "../../errors/AppError"
import ContactCustomField from "../../models/ContactCustomField"

const GetContactCustomFieldByNameAndContactIdService = async (name: string, contactId: number): Promise<ContactCustomField | null> => {
    const customField = await ContactCustomField.findOne({
        where: { name, contactId }
    });

    if (!customField) {
        // Instead of throwing an error, return null when the record is not found
        return null;
    }

    return customField;
}

export default GetContactCustomFieldByNameAndContactIdService;
