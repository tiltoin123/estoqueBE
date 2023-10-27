import Contact from "../../models/Contact";
import Message from "../../models/Message";

const GetPenultimateMessageReceived = async (contact: Contact): Promise<Message | null> => {
    try {
        const penultimateMessage = await Message.findOne({
            where: {
                storeId: contact.storeId,
                contactId: contact.id,
                fromMe: 0
            },
            order: [["createdAt", "DESC"]],
            offset: 1, // Offset by 1 to get the second-to-last message
            limit: 1,  // Limit to 1 message
        });

        return penultimateMessage;
    } catch (error) {
        console.error("Error retrieving penultimate message received:", error);
        throw error;
    }
};

export default GetPenultimateMessageReceived;
