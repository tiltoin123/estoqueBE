import Contact from "../../models/Contact";
import Message from "../../models/Message";

const GetLastMessageSent = async (contact: Contact): Promise<Message | null> => {
    try {
        const lastMessage = await Message.findOne({
            where: {
                storeId: contact.storeId,
                to: contact.number,
                fromMe: 1
            },
            order: [["createdAt", "DESC"]],
        });

        return lastMessage;
    } catch (error) {
        console.error("Error retrieving last message sent:", error);
        throw error;
    }
};

export default GetLastMessageSent;