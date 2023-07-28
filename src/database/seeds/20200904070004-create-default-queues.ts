import { QueryInterface } from "sequelize";

const queueData = [
    {
        name: "Canal de Boas Vindas",
        color: "#008b02",
        greetingMessage: "Olá sou o chatbot da imobiliária fábio liporoni, como posso ajudar?",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Canal de Vendas",
        color: "#004dcf",
        greetingMessage: "Seja Bem Vindo ao Canal de Vendas.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Canal de Compras",
        color: "#0000FF",
        greetingMessage: "Seja Bem Vindo ao Canal de Compras.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Canal de Finanças",
        color: "#48D1CC",
        greetingMessage: "Seja Bem Vindo ao Canal de Finanças.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Canal Jurídico",
        color: "#00FF00",
        greetingMessage: "Seja Bem Vindo ao Canal Jurídico.",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 1,
    },
    {
        name: "Fila Teste da Imobiliária Teste",
        color: "#00FFF0",
        greetingMessage: "se essa mensagem ta aparecendo na store 1 vc falhou",
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: 2,
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
