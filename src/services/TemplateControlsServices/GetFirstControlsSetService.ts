import TemplateControls from "../../models/TemplateControls";

const GetFirstControlsSetService = async (): Promise<TemplateControls | null> => {
    try {
        const templateItems = await TemplateControls.findOne({
            order: [['templateId', 'ASC']],
        });

        return templateItems;
    } catch (error) {
        throw error;
    }
};

export default GetFirstControlsSetService;
