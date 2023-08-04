import { QueryInterface } from "sequelize";

const storeData = [
    {
        name: "Imobiliária Fabio Liporoni",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Imobiliária Teste",
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
