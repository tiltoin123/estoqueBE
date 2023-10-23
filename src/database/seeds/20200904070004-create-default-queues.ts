import { QueryInterface } from "sequelize";

const queueData = [
    {
        name: "Vendas",
        color: "#004dcf",
        greetingMessage: "Seja Bem Vindo ao Canal de Vendas.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Compras",
        color: "#0000FF",
        greetingMessage: "Seja Bem Vindo ao Canal de Compras.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Boletos",
        color: "#48D1CC",
        greetingMessage: "Seja Bem Vindo ao Canal de Finanças.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Transferência de lotes",
        color: "#65FE41",
        greetingMessage: "Seja Bem Vindo ao Canal de Transferência.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Renegociação de parcelas",
        color: "#0123F0",
        greetingMessage: "Seja Bem Vindo ao Canal de Renegociação.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Jurídico",
        color: "#00CC00",
        greetingMessage: "Seja Bem Vindo ao Canal de Jurídico.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Outros",
        color: "#00FFF0",
        greetingMessage: "Seja Bem vindo ao Canal Solicitações Diversas.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Tio fábio",
        color: "#FFD200",
        greetingMessage: "Seja Bem vindo ao Canal do tio fábio, nossa inteligência artificial.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeAiId: 1,
        storeId: 1,
    },
];

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        try {
            await queryInterface.bulkInsert("Queues", queueData, {});
        } catch (err) {
            console.error("Error inserting data into Queues table:", err);
        }
    },

    down: async (queryInterface: QueryInterface) => {
        try {
            await queryInterface.bulkDelete("Queues", {});
        } catch (err) {
            console.error("Error deleting data from Queues table:", err);
        }
    },
};
