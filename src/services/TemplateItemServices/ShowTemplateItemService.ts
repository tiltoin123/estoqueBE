import AppError from "../../errors/AppError";
import TemplateItems from "../../models/TemplateItems";

const ShowTemplateItemsService = async (templateItemsId: number): Promise<TemplateItems> => {
    try {
        const templateItems = await TemplateItems.findByPk(templateItemsId);

        if (!templateItems) {
            throw new AppError("ERR_NO_TEMPLATE_ITEMS_FOUND", 404);
        }

        return templateItems;
    } catch (error) {
        // Handle the error here or rethrow it if needed
        throw error;
    }
};

export default ShowTemplateItemsService;
