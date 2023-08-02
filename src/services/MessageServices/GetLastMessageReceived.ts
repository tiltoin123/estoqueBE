import Contact from "../../models/Contact";
import Message from "../../models/Message";

const GetLastMessageReceived = async (contact: Contact): Promise<Message | null> => {
    try {

        const lastMessage = await Message.findOne({
            where: {
                storeId: contact.storeId,
                Id: contact.id,
                fromMe: 0
            },
            order: [["createdAt", "DESC"]],
        });

        return lastMessage;
    } catch (error) {
        console.error("Error retrieving last message:", error);
        throw error;
    }
};

export default GetLastMessageReceived;