import AppError from "../../errors/AppError";
import Contact from "../../models/Contact";

const UpdateContactFullNameService = async (
    fullname: string,
    contactId: number
): Promise<Contact> => {
    try {
        console.log("tentou achar");

        const [rowsAffected, updatedContacts] = await Contact.update(
            { fullName: fullname },
            { where: { id: contactId }, returning: true }
        );

        if (rowsAffected === 0) {
            throw new AppError("ERR_NO_CONTACT_FOUND", 404);
        }

        console.log('tentouatttttt@#$@#$', fullname);

        return updatedContacts[0];
    } catch (error) {
        throw new AppError("ERR_CONTACT_UPDATE_FAILED", 500);
    }
}

export default UpdateContactFullNameService;
