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
                    notice: "Por favor, espere sua solicitação anterior seja atendida antes de fazer uma nova.",
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
