import { Op } from "sequelize";
import ContactTags from "../../models/ContactTags";

interface Request {
    queueName: string;
    storeId: number;
    searchParam?: string;
    pageNumber?: string;
}

interface Response {
    contactTags: ContactTags[];
    count: number;
    hasMore: boolean;
}

const ListContactByTagsService = async ({
    storeId,
    searchParam = "",
    pageNumber = "1"
}: Request): Promise<Response> => {
    const sanitizedSearchParam = searchParam.toLowerCase().trim();

    const whereCondition = {
        [Op.and]: [
            storeId,
            {
                tagName: {
                    [Op.like]: `%${sanitizedSearchParam}%`
                }
            }
        ]
    };

    const limit = 20;
    const offset = limit * (+pageNumber - 1);

    const { count, rows: contactTags } = await ContactTags.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
    });

    const hasMore = count > offset + contactTags.length;

    return {
        contactTags,
        count,
        hasMore
    };
};

export default ListContactByTagsService;
