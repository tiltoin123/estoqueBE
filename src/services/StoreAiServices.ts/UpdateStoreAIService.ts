import AppError from "../../errors/AppError"
import StoreAi from "../../models/StoreAi"
import ShowStoreAiService from "./ShowStoreAiService"

interface StoreAiData {
    systemPrompt?: string
    name?: string
}

interface Request {
    storeAiData: StoreAiData
    storeAiId: string
}

interface Response {
    id: number,
    name: string,
    storeId: number
    systemPrompt: string
}

const UpdateStoreAiService = async ({
    storeAiData,
    storeAiId,
}: Request): Promise<Response> => {
    const { name, systemPrompt } = storeAiData
    const storeAi = await StoreAi.findByPk(storeAiId)

    if (!storeAi) {
        throw new AppError("ERR_NO_STORE_AI_FOUND", 404);
    }

    await storeAi.update({
        name,
        systemPrompt
    })

    return storeAi
}

export default UpdateStoreAiService;