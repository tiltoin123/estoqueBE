import AppError from "../../errors/AppError"
import ContactCustomField from "../../models/ContactCustomField"
import GetContactCustomFieldByNameAndContactIdService from "./GetContactCustomFieldByNameAndContactIdService";


const GetContactFullNameService = async (contactId: number): Promise<ContactCustomField> => {

    const contactFullName = await GetContactCustomFieldByNameAndContactIdService("full name", contactId);
    return contactFullName
};

export default GetContactFullNameService;