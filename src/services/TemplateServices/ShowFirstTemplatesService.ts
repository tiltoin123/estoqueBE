import { Op } from "sequelize";
import AppError from "../../errors/AppError";
import Template from "../../models/Template";

const ShowFirstTemplatesService = async (storeId: number): Promise<Template> => {
    try {
        const template = await Template.findOne({
            where: {
                lastMessage: null,
                storeId: storeId
            }
        });

        if (!template) {
            throw new AppError("ERR_TEMPLATE_NOT_FOUND");
        }

        return template;
    } catch (error) {
        throw error;
    }
};

export default ShowFirstTemplatesService;
