import AppError from "../../errors/AppError";
import Store from "../../models/Stores";

const ShowStoreService = async (storeId: number): Promise<Store> => {
    try {
        const store = await Store.findByPk(storeId);

        if (!store) {
            throw new AppError("ERR_TEMPLATE_NOT_FOUND");
        }

        return store;
    } catch (error) {
        // Handle the error here or rethrow it if needed
        throw error;
    }
};

export default ShowStoreService;