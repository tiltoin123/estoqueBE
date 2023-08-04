import { Op, Sequelize, fn, col } from "sequelize";
import Contact from "../../models/Contact";

interface Request {
  storeId: number;
  searchParam?: string;
  pageNumber?: string;
}

interface Response {
  contacts: Contact[];
  count: number;
  hasMore: boolean;
}

const ListContactsService = async ({
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
          {
            number: {
              [Op.like]: `%${sanitizedSearchParam}%`
            }
          }
        ]
      },
      { storeId: storeId }
    ]
  };
  const limit = 20;
  const offset = limit * (+pageNumber - 1);

  const { count, rows: contacts } = await Contact.findAndCountAll({
    where: whereCondition,
    limit,
    offset,
    order: [["name", "ASC"]]
  });

  const hasMore = count > offset + contacts.length;

  return {
    contacts,
    count,
    hasMore
  };
};

export default ListContactsService;
