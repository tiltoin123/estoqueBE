import AppError from "../../errors/AppError";
import ContactCustomField from "../../models/ContactCustomField";

interface CustomField {
    name: string;
    value: string;
}

const UpdateContactCustomFieldService = async (
    data: CustomField,
    contactId: number
): Promise<ContactCustomField> => {
    const { name, value } = data;

    const existingField = await ContactCustomField.findOne({
        where: { name, contactId }
    });

    if (!existingField) {
        throw new AppError("ERR_FIELD_NOT_FOUND");
    }

    await existingField.update({ value });

    return existingField;
};

export default UpdateContactCustomFieldService;
