import AppError from "../../errors/AppError";
import StoreAi from "../../models/StoreAi";

const ShowStoreAiService = async (id: string): Promise<StoreAi> => {

    try {
        const storeAi = await StoreAi.findByPk(id)
        if (!storeAi) {
            throw new AppError("ERR_STORE_AI_NOT_FOUND");
        }

        return storeAi;
    } catch (error) {
        throw error;
    }
};

export default ShowStoreAiService;