import Contact from "../../models/Contact";
import Message from "../../models/Message";

const GetLastMessageSent = async (contact: Contact) => {
    try {
        const lastMessage = await Message.findOne({
            where: {
                storeId: contact.storeId,
                contactId: contact.id,
                fromMe: 1
            },
            order: [["createdAt", "DESC"]],
        });

        return lastMessage;
    } catch (error) {
        console.error("Error retrieving last message:", error);
        throw error;
    }
};

export default GetLastMessageSent;