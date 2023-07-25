import Message from "../../models/Message";

const GetLastMessageReceived = async (contactId: number | string) => {
    try {
        const lastMessage = await Message.findOne({
            where: {
                contactId: contactId,
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