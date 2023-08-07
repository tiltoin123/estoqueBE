import TemplateControls from "../../models/TemplateControls";
import AppError from "../../errors/AppError";

const ListTemplateControlsService = async (templateId: number): Promise<TemplateControls[]> => {
    const templateItems = await TemplateControls.findAll({
        where: {
            templateId,
        }
    });

    if (!templateItems) {
        throw new AppError("ERR_NO_TEMPLATE_ITEMS_FOUND", 404);
    }

    return templateItems;
};

export default ListTemplateControlsService;