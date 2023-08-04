import { Op, Sequelize, fn, col } from "sequelize";
import QuickAnswer from "../../models/QuickAnswer";

interface Request {
  storeId: number;
  searchParam?: string;
  pageNumber?: string;
}

interface Response {
  quickAnswers: QuickAnswer[];
  count: number;
  hasMore: boolean;
}

const ListQuickAnswerService = async ({
  storeId,
  searchParam = "",
  pageNumber = "1"
}: Request): Promise<Response> => {
  const sanitizedSearchParam = searchParam.toLowerCase().trim();

  const whereCondition = {
    message: {
      [Op.like]: `%${sanitizedSearchParam}%`
    },
    storeId: storeId
  };
  const limit = 20;
  const offset = limit * (+pageNumber - 1);

  const { count, rows: quickAnswers } = await QuickAnswer.findAndCountAll({
    where: whereCondition,
    limit,
    offset,
    order: [["message", "ASC"]]
  });

  const hasMore = count > offset + quickAnswers.length;

  return {
    quickAnswers,
    count,
    hasMore
  };
};

export default ListQuickAnswerService;
