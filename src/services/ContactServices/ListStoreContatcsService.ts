import AppError from "../../errors/AppError";
import Contact from "../../models/Contact";

const ListStoreContactsService = async (
    storeId: number
): Promise<Contact[]> => {
    const contacts = await Contact.findAll({
        where: {
            storeId: storeId
        }
    })
    if (!contacts) {
        throw new AppError("ERR_NO_USER_FOUND", 404)
    }
    return contacts
}

export default ListStoreContactsService;