import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "TimeOutConfig",
            [
                {
                    storeId: 1,
                    status: true,
                    minutesDuration: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ],
            {}
        );
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("TimeOutConfig", {});
    }
};
