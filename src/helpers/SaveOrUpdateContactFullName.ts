import CreateContactCustomFieldService from "../services/ContactCustomFieldServices/CreateContactCustomFieldService"
import GetContactCustomFieldByNameAndContactIdService from "../services/ContactCustomFieldServices/GetContactCustomFieldByNameAndContactIdService"
import UpdateContactCustomFieldService from "../services/ContactCustomFieldServices/UpdateContactCustomFieldService"

const SaveOrUpdateContactFullName = async (contactId: number, fullName: string) => {
    const hasFullName = await GetContactCustomFieldByNameAndContactIdService("full name", contactId)

    const data = {
        name: "full name",
        value: fullName
    }
    if (hasFullName) {
        UpdateContactCustomFieldService(data, contactId)
    } else {
        CreateContactCustomFieldService(data, contactId)
    }

}
export default SaveOrUpdateContactFullName;