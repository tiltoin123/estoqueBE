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
