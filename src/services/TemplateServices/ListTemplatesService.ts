import Template from "../../models/Template";
import AppError from "../../errors/AppError";

const ListTemplatesService = async (): Promise<Template[]> => {
    const template = await Template.findAll({
        attributes: ["id", "message", "lastMessage", "nextMessage", "condition", "queueId"],
    });

    if (!template) {
        throw new AppError("ERR_NO_TEMPLATES_FOUND", 404);
    }

    return template;
};

export default ListTemplatesService;