
import TemplateControls from "../../models/TemplateControls";

const ListTemplateControlsService = async (templateId: number | null): Promise<TemplateControls[]> => {
    try {
        const templateItems = await TemplateControls.findAll({
            where: {
                templateId,
            },
        });

        return templateItems;
    } catch (error) {
        throw error;
    }
};

export default ListTemplateControlsService;
