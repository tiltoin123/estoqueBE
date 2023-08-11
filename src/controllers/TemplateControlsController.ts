import { Request, Response } from "express";
import ShowTemplateControlsService from "../services/TemplateControlsServices/ShowTemplateControlsService";
import ListTemplateControlsService from "../services/TemplateControlsServices/ListTemplateControlsService";

export const show = async (req: Request, res: Response): Promise<Response> => {
    const { templatecontrolsId } = req.params;

    try {
        const templateControls = await ShowTemplateControlsService(Number(templatecontrolsId));
        return res.status(200).json(templateControls);
    } catch (error) {
        return res.status(404).json({ error: error });
    }
};

export const index = async (req: Request, res: Response): Promise<Response> => {
    try {
        const templateId = req.params
        const templateControls = await ListTemplateControlsService(Number(templateId));
        return res.status(200).json(templateControls);
    } catch (error) {
        return res.status(404).json({ error: error });
    }
};
