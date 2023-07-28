import { Sequelize, Op } from "sequelize";
import Queue from "../../models/Queue";
import User from "../../models/User";
import Whatsapp from "../../models/Whatsapp";

interface Request {
  storeId: number
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
  const whereCondition =  {
    [Op.and]: [
      {
        [Op.or]: [
          {
            "$User.name$": Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("User.name")),
              "LIKE",
              `%${searchParam.toLowerCase()}%`
            )
          },
          { email: { [Op.like]: `%${searchParam.toLowerCase()}%` } }
        ]
      },
      { storeId: storeId }
    ]
  };;
  const limit = 20;
  const offset = limit * (+pageNumber - 1);

  const { count, rows: users } = await User.findAndCountAll({
    where: whereCondition,
    attributes: ["name", "id", "email", "profile", "createdAt", "storeId"],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    include: [
      { model: Queue, as: "queues", attributes: ["id", "name", "color"] },
      { model: Whatsapp, as: "whatsapp", attributes: ["id", "name"] },
    ]
  });

  const hasMore = count > offset + users.length;
  console.log("listUserService linha 49 users[0].storeId", users[0].storeId)
  return {
    users,
    count,
    hasMore
  };
};

export default ListUsersService;
