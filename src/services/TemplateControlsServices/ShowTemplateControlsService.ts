import AppError from "../../errors/AppError";
<<<<<<< HEAD
import TemplateControls from "../../models/TemplateControls";


const ShowTemplateControlsService = async (templateControlsId: number): Promise<TemplateControls> => {
    try {
        const templateControls = await TemplateControls.findByPk(templateControlsId);

        if (!templateControls) {
            throw new AppError("ERR_NO_TEMPLATE_CONTROLS_FOUND", 404);
        }

        return templateControls;
=======
import TemplateItems from "../../models/TemplateControls";

const ShowTemplateControlsService = async (templateItemsId: number): Promise<TemplateItems> => {
    try {
        const templateItems = await TemplateItems.findByPk(templateItemsId);

        if (!templateItems) {
            throw new AppError("ERR_NO_TEMPLATE_ITEMS_FOUND", 404);
        }

        return templateItems;
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)
    } catch (error) {
        // Handle the error here or rethrow it if needed
        throw error;
    }
};

export default ShowTemplateControlsService;
