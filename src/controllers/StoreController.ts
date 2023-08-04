import { Request, Response } from "express";
import ShowStoreService from "../services/StoreServices/ShowStoreService";

export const show = async (req: Request, res: Response): Promise<Response> => {
    const { storeId } = req.params

    try {
        const store = await ShowStoreService(Number(storeId))
        return res.status(200).json(store)
    } catch (error) {
        return res.status(404).json({ error: error })
    }
}