import AppError from "../../errors/AppError";
import TemplateControls from "../../models/TemplateControls";


const ShowTemplateControlsService = async (templateControlsId: number): Promise<TemplateControls> => {
    try {
        const templateControls = await TemplateControls.findByPk(templateControlsId);

        if (!templateControls) {
            throw new AppError("ERR_NO_TEMPLATE_CONTROLS_FOUND", 404);
        }

        return templateControls;

    } catch (error) {
        // Handle the error here or rethrow it if needed
        throw error;
    }
};

export default ShowTemplateControlsService;
