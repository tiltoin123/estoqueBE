import { Op, Sequelize, fn, col } from "sequelize";
import Contact from "../../models/Contact";
import ContactTags from "../../models/ContactTags";
import ListContactTagsService from "../ContactTagsService/ListContactTagsService";

interface Request {
  storeId: number;
  searchParam?: string;
  pageNumber?: string;
}

interface Response {
  contacts: Contact[];
  count: number;
  hasMore: boolean;
  tags: ContactTags[] | null
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

  let contactIds: number[] = []
  contacts.forEach(contacts => {
    contactIds.push(contacts.id)
  });
  const tags = await ListContactTagsService(contactIds)

  const hasMore = count > offset + contacts.length;
  return {
    contacts,
    count,
    hasMore,
    tags
  };
};

export default ListContactsService;
