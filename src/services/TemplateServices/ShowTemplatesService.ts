import AppError from "../../errors/AppError";
import Templates from "../../models/Template";

const ShowTemplatesService = async (templateId: number): Promise<Templates> => {
    try {
        const template = await Templates.findByPk(templateId);

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
