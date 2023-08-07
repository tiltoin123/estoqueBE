<<<<<<< HEAD
import TemplateControls from "../../models/TemplateControls"; // Adjust the path as needed

const ListTemplateControlsService = async (templateId: number): Promise<TemplateControls[]> => {
    try {
        const templateItems = await TemplateControls.findAll({
            where: {
                templateId,
            },
        });

        return templateItems;
    } catch (error) {
        // Handle the error as needed
        throw error;
    }
};

export default ListTemplateControlsService;
=======
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
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)
