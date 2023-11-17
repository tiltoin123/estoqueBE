import { Sequelize, Op, fn, col } from "sequelize";
import User from "../../models/User";

interface Request {
  storeId: number;
  searchParam?: string;
  pageNumber?: string | number;
}

interface Response {
  users: User[];
  count: number;
  hasMore: boolean;
}

const ListUsersService = async ({
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

  const { count, rows: users } = await User.findAndCountAll({
    where: whereCondition,
    attributes: ["name", "id", "email", "profile", "createdAt", "storeId"],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  const hasMore = count > offset + users.length;
  return {
    users,
    count,
    hasMore
  };
};

export default ListUsersService;
