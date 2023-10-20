import { Request, Response } from "express";
import { getIO } from "../libs/socket";
import CreateStoreAiService from "../services/StoreAiServices.ts/CreateStoreAiService";
import ShowStoreAiService from "../services/StoreAiServices.ts/ShowStoreAiService";
import UpdateStoreAiService from "../services/StoreAiServices.ts/UpdateStoreAIService";
import DeleteStoreAiService from "../services/StoreAiServices.ts/DeleteStoreAiService";
import ListStoreAiService from "../services/StoreAiServices.ts/ListStoreAiService";
import ListQueuesService from "../services/QueueService/ListQueuesService";

type IndexQuery = {
    searchParam: string;
    pageNumber: string;
};

interface StoreAiData {
    systemPrompt?: string
    name?: string
    storeId: number
}


export const index = async (req: Request, res: Response): Promise<Response> => {
    const { searchParam, pageNumber } = req.query as IndexQuery;
    const storeId = req.user.storeId
    const queues = await ListQueuesService(storeId)
    const { storeAi, count, hasMore } = await ListStoreAiService({
        storeId,
        searchParam,
        pageNumber
    });

    return res.status(200).json({ storeAi, count, hasMore, queues });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
    const { name, systemPrompt } = req.body;
    const storeId = req.user.storeId

    const storeAi = await CreateStoreAiService({ storeId, name, systemPrompt });

    const io = getIO();
    io.emit("storeai", {
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

    const { storeAiId } = req.params
    const storeAiData: StoreAiData = req.body

    const storeAi = await UpdateStoreAiService({
        storeAiData,
        storeAiId
    });

    const io = getIO();
    io.emit("storeai", {
        action: "update",
        storeAi
    });

    return res.status(201).json(storeAi);
};

export const remove = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { storeAiId } = req.params;

    await DeleteStoreAiService(storeAiId);

    const io = getIO();
    io.emit("storeai", {
        action: "delete",
        storeAiId: +storeAiId
    });
    return res.status(200).send();
};
