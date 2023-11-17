import { Sequelize, Op, fn, col } from "sequelize";
import Suppliers from "../../models/Suppliers";
import Products from "../../models/Products";

interface Request {
    storeId: number;
    searchParam?: string;
    pageNumber?: string | number;
}

interface Response {
    products: Products[];
    count: number;
    hasMore: boolean;
}

const ListProductsService = async ({
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
                        name: {
                            [Op.like]: `%${sanitizedSearchParam}%`
                        }
                    },

                ]
            },
            {
                storeId: storeId
            },
        ]
    };
    const limit = 20;
    const offset = limit * (+pageNumber - 1);

    const { count, rows: products } = await Products.findAndCountAll({
        where: whereCondition,
        include: [{
            model: Suppliers,
            as: "supplier",
            attributes: ["nomeFantasia"],
            required: false,
            duplicating: false,
        },],
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });

    const hasMore = count > offset + products.length;
    return {
        products,
        count,
        hasMore
    };
};

export default ListProductsService;
