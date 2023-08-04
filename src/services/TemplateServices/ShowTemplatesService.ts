import AppError from "../../errors/AppError";
import Template from "../../models/Template";

const ShowTemplatesService = async (templateId: number): Promise<Template> => {
    try {
        const template = await Template.findByPk(templateId);

        if (!template) {
            throw new AppError("ERR_TEMPLATE_NOT_FOUND");
        }

        return template;
    } catch (error) {
        // Handle the error here or rethrow it if needed
        throw error;
    }
};

export default ShowTemplatesService;
