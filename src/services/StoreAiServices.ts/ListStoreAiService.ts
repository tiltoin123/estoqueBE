import StoreAi from "../../models/StoreAi";

const ListStoreAiService = async (storeId: number): Promise<StoreAi[]> => {
    const storeAi = await StoreAi.findAll({ where: { storeId }, order: [["name", "ASC"]] });

    return storeAi;
};

export default ListStoreAiService;