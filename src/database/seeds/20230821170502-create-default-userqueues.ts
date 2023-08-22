import { QueryInterface } from "sequelize";

const userQueueData = [
    {
        userId: 1,
        queueId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 1,
        queueId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 1,
        queueId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 2,
        queueId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 2,
        queueId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 2,
        queueId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 2,
        queueId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 2,
        queueId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 2,
        queueId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 2,
        queueId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert("UserQueues", userQueueData, {});
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("UserQueues", {});
    }
};