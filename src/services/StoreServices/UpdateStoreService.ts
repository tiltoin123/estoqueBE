import Store from "../../models/Stores";
import ShowStoreService from "./ShowStoreService";

interface storeData {
    email?: string;
    name?: string;
    isActive?: boolean
}

const UpdateStoreService = async (storeId: number, storeData: storeData): Promise<Store> => {

    const store = await ShowStoreService(storeId)

    await store.update({
        email: storeData.email,
        name: storeData.name,
        isActive: storeData.isActive
    })
    await store.reload()

    return store
}

export default UpdateStoreService;