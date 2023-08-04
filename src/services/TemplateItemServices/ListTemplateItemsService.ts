import TemplateItems from "../../models/TemplateItems";
import AppError from "../../errors/AppError";

const ListTemplateItemsService = async (templateId: number): Promise<TemplateItems[]> => {
    const templateItems = await TemplateItems.findAll({
        where: {
            templateId,
        }
    });

    if (!templateItems) {
        throw new AppError("ERR_NO_TEMPLATE_ITEMS_FOUND", 404);
    }

    return templateItems;
};

export default ListTemplateItemsService;