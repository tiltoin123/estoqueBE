import { QueryInterface } from "sequelize";

const storeLinkData = [
    {
        name: "Anúncio no facebook",
        utility: "Vendas",
        link: "https://fb.me/",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Anúncio no site",
        utility: "Vendas",
        link: "https://www.imobiliariafabioliporoni.com.br/comprar",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
];

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        try {
            await queryInterface.bulkInsert("StoreLinks", storeLinkData, {});
        } catch (err) {
            console.error("Error inserting data into StoreLinks table:", err);
        }
    },

    down: async (queryInterface: QueryInterface) => {
        try {
            await queryInterface.bulkDelete("StoreLinks", {});
        } catch (err) {
            console.error("Error deleting data from StoreLink table:", err);
        }
    },
};
