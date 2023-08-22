import AppError from "../../errors/AppError"
import ContactCustomField from "../../models/ContactCustomField"
import GetContactCustomFieldByNameAndContactIdService from "./GetContactCustomFieldByNameAndContactIdService";


const GetContactFullNameService = async (contactId: number): Promise<ContactCustomField> => {
    return GetContactCustomFieldByNameAndContactIdService("full name", contactId);
};

export default GetContactFullNameService;