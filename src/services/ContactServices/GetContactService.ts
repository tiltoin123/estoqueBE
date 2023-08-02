import AppError from "../../errors/AppError";
import Contact from "../../models/Contact";
import CreateContactService from "./CreateContactService";

interface ExtraInfo {
    name: string;
    value: string;
}

interface Request {
    storeId: number;
    name: string;
    number: string;
    email?: string;
    profilePicUrl?: string;
    extraInfo?: ExtraInfo[];
}

const GetContactService = async ({ name, number, storeId }: Request): Promise<Contact> => {
    const numberExists = await Contact.findOne({
        where: { number }
    });

    if (!numberExists) {
        const contact = await CreateContactService({
            storeId,
            name,
            number,
        })

        if (contact == null)
            throw new AppError("CONTACT_NOT_FIND")
        else
            return contact
    }

    return numberExists
};

export default GetContactService;