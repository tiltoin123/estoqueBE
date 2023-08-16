import TemplateControls from "../../models/TemplateControls";

const CountTemplateControlsService = async (templateId: number): Promise<number> => {
    try {
        const { count } = await TemplateControls.findAndCountAll({
            where: {
                templateId,
            },
        })
        return count;
    } catch (error) {
        throw error;
    }
};

export default CountTemplateControlsService;
