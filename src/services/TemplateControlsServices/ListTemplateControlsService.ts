
import TemplateControls from "../../models/TemplateControls";

const ListTemplateControlsService = async (templateId: number | null): Promise<TemplateControls[]> => {
    try {
        const templateItems = await TemplateControls.findAll({
            where: {
                templateId,
            },
            order: [
                ['choice', 'ASC']
            ],
        });

        return templateItems;
    } catch (error) {
        throw error;
    }
};

export default ListTemplateControlsService;
