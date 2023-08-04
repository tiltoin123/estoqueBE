import { Op } from "sequelize";
import { startOfDay, endOfDay, parseISO } from "date-fns";

import Ticket from "../../models/Ticket";
import Contact from "../../models/Contact";
import Message from "../../models/Message";
import Queue from "../../models/Queue";
import ShowUserService from "../UserServices/ShowUserService";
import Whatsapp from "../../models/Whatsapp";

interface Request {
  storeId: number;
  searchParam?: string;
  pageNumber?: string;
  status?: string;
  date?: string;
  showAll?: string;
  userId: string;
  withUnreadMessages?: string;
  queueIds: number[];
}

interface Response {
  tickets: Ticket[];
  count: number;
  hasMore: boolean;
}

const ListTicketsService = async ({
  storeId,
  searchParam = "",
  pageNumber = "1",
  queueIds,
  status,
  date,
  showAll,
  userId,
  withUnreadMessages
}: Request): Promise<Response> => {
  let whereCondition: any = {
    [Op.and]: [
      { [Op.or]: [{ userId }, { status: "pending" }] },
      { storeId }
    ],
    queueId: { [Op.or]: [queueIds, null] }
  };
  let includeCondition: any[] = [
    {
      model: Contact,
      as: "contact",
      attributes: ["id", "name", "number", "profilePicUrl"]
    },
    {
      model: Queue,
      as: "queue",
      attributes: ["id", "name", "color"]
    },
    {
      model: Whatsapp,
      as: "whatsapp",
      attributes: ["name"]
    }
  ];

  if (showAll === "true") {
    whereCondition = { [Op.and]: [{ queueId: { [Op.or]: [queueIds, null] } }, { storeId }] };
  }

  if (status) {
    whereCondition = {
      ...whereCondition,
      status
    };
  }

  if (searchParam) {
    const sanitizedSearchParam = `%${searchParam.toLocaleLowerCase().trim()}%`;

    includeCondition = [
      ...includeCondition,
      {
        model: Message,
        as: "messages",
        attributes: ["id", "body"],
        where: {
          body: {
            [Op.like]: sanitizedSearchParam
          }
        },
        required: false,
        duplicating: false
      }
    ];

    whereCondition = {
      ...whereCondition,
      [Op.or]: [
        {
          "$contact.name$": {
            [Op.like]: sanitizedSearchParam
          }
        },
        {
          "$contact.number$": {
            [Op.like]: sanitizedSearchParam
          }
        },
        {
          "$messages.body$": {
            [Op.like]: sanitizedSearchParam
          }
        }
      ]
    };
  }

  if (date) {
    whereCondition = {
      ...whereCondition,
      createdAt: {
        [Op.between]: [startOfDay(parseISO(date)), endOfDay(parseISO(date))]
      }
    };
  }

  if (withUnreadMessages === "true") {
    const user = await ShowUserService(userId);
    const userQueueIds = user.queues.map(queue => queue.id);

    whereCondition = {
      ...whereCondition,
      [Op.or]: [
        {
          userId
        },
        {
          status: "pending"
        }
      ],
      queueId: {
        [Op.or]: [userQueueIds, null]
      },
      unreadMessages: {
        [Op.gt]: 0
      }
    };
  }

  const limit = 40;
  const offset = limit * (+pageNumber - 1);

  const { count, rows: tickets } = await Ticket.findAndCountAll({
    where: whereCondition,
    include: includeCondition,
    distinct: true,
    limit,
    offset,
    order: [["updatedAt", "DESC"]]
  });

  const hasMore = count > offset + tickets.length;

  return {
    tickets,
    count,
    hasMore
  };
};

export default ListTicketsService;
