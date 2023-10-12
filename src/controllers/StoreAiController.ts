import { Request, Response } from "express";
import { getIO } from "../libs/socket";
import CreateStoreAiService from "../services/StoreAiServices.ts/CreateStoreAiService";
import ShowStoreAiService from "../services/StoreAiServices.ts/ShowStoreAiService";
import UpdateStoreAiService from "../services/StoreAiServices.ts/UpdateStoreAIService";
import DeleteStoreAiService from "../services/StoreAiServices.ts/DeleteStoreAiService";
import ListStoreAiService from "../services/StoreAiServices.ts/ListStoreAiService";

interface StoreAiData {
    systemPrompt?: string
    name?: string
    storeId: number
}


export const index = async (req: Request, res: Response): Promise<Response> => {
    const storeId = req.user.storeId
    const storeAi = await ListStoreAiService(storeId);

    return res.status(200).json(storeAi);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
    const { name, systemPrompt } = req.body;
    const storeId = req.user.storeId

    const storeAi = await CreateStoreAiService({ storeId, name, systemPrompt });

    const io = getIO();
    io.emit("storeAi", {
        action: "create",
        storeAi
    });

    return res.status(200).json(storeAi);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
    const { storeAiId } = req.params;

    const storeAi = await ShowStoreAiService(storeAiId);
    return res.status(200).json(storeAi);
};

export const update = async (
    req: Request,
    res: Response
): Promise<Response> => {
    console.log(req.params, "update")
    const { storeAiId } = req.params
    const storeAiData: StoreAiData = req.body
    console.log(storeAiData)
    const storeAi = await UpdateStoreAiService({
        storeAiData,
        storeAiId
    });
    console.log(storeAi)
    const io = getIO();
    io.emit("storeAi", {
        action: "update",
        storeAi
    });
    console.log(storeAi)
    return res.status(201).json(storeAi);
};

export const remove = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { storeAiId } = req.params;

    await DeleteStoreAiService(storeAiId);

    const io = getIO();
    io.emit("storeAi", {
        action: "delete",
        storeAiId: +storeAiId
    });
    return res.status(200).send();
};
