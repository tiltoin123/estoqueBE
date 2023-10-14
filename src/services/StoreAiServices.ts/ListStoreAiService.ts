import StoreAi from "../../models/StoreAi";
import { Op, Sequelize, fn, col } from "sequelize";

interface Request {
    storeId: number;
    searchParam?: string;
    pageNumber?: string;
}

interface Response {
    storeAi: StoreAi[];
    count: number;
    hasMore: boolean;
}

const ListStoreAiService = async ({
    storeId,
    searchParam = "",
    pageNumber = "1"
}: Request): Promise<Response> => {
    const sanitizedSearchParam = searchParam.toLowerCase().trim();

    const whereCondition = {
        name: {
            [Op.like]: `%${sanitizedSearchParam}%`
        },
        storeId: storeId
    };
    const limit = 20;
    const offset = limit * (+pageNumber - 1);

    const { count, rows: storeAi } = await StoreAi.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["name", "ASC"]]
    });
    const hasMore = count > offset + storeAi.length;

    return {
        storeAi,
        count,
        hasMore
    };
};

export default ListStoreAiService;