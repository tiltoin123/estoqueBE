import StoreAi from "../../models/StoreAi"


interface Request {
    systemPrompt: string
    name: string
    storeId: number
}

interface Response {
    id: number,
    name: string,
    storeId: number
    systemPrompt: string
}

const CreateStoreAiService = async ({
    storeId,
    name,
    systemPrompt
}: Request): Promise<Response> => {

    const storeAi = await StoreAi.create({
        storeId,
        name,
        systemPrompt
    })

    return storeAi
}

export default CreateStoreAiService;