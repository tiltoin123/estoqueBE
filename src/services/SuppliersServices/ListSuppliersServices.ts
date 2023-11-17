import { Sequelize, Op, fn, col } from "sequelize";
import Suppliers from "../../models/Suppliers";

interface Request {
    storeId: number;
    searchParam?: string;
    pageNumber?: string | number;
}

interface Response {
    suppliers: Suppliers[];
    count: number;
    hasMore: boolean;
}

const ListSuppliersService = async ({
    storeId,
    searchParam = "",
    pageNumber = "1"
}: Request): Promise<Response> => {
    const sanitizedSearchParam = searchParam.toLowerCase().trim();

    const whereCondition = {
        [Op.and]: [
            {
                [Op.or]: [
                    {
                        razaoSocial: {
                            [Op.like]: `%${sanitizedSearchParam}%`
                        }
                    },
                    {
                        nomeFantasia: {
                            [Op.like]: `%${sanitizedSearchParam}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${sanitizedSearchParam}%`
                        }
                    }
                ]
            },
            {
                storeId: storeId
            }
        ]
    };
    const limit = 20;
    const offset = limit * (+pageNumber - 1);

    const { count, rows: suppliers } = await Suppliers.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });

    const hasMore = count > offset + suppliers.length;
    return {
        suppliers,
        count,
        hasMore
    };
};

export default ListSuppliersService;
