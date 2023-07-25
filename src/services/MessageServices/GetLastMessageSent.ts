import Message from "../../models/Message";

const GetLastMessageSent = async (to: string) => {
    try {
        const lastMessage = await Message.findOne({
            where: {
                to: to,
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