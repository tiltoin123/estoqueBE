import Contact from "../../models/Contact";

const GetContactByNumber = async (phoneNumber: string) => {
    try {
        const contact = await Contact.findOne({
            where: {
                number: phoneNumber
            }
        })
        return contact
    } catch (error) {
        console.error("Error retrieving contact:", error)
        throw error;
    }
}

export default GetContactByNumber;