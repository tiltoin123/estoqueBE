import { QueryInterface } from "sequelize";

const storeData = [
    {
        name: "estoque e armazenagem super",
        email: "italohttp25@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "estoquista franca",
        email: "italohttp25@msn.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert("Stores", storeData, {});
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("Stores", {});
    }
};
