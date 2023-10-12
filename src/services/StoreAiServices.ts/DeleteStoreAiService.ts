import AppError from "../../errors/AppError";
import StoreAi from "../../models/StoreAi";

const DeleteStoreAiService = async (id: string): Promise<void> => {
    const storeAi = await StoreAi.findByPk(id)

    if (!storeAi) {
        throw new AppError("ERR_NO_QUICK_ANSWER_FOUND", 404);
    }

    await storeAi.destroy();
};

export default DeleteStoreAiService;
