import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "templateControls", [
            {
                id: 1, valor: "Comprar Imóvel", choice: "1", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2, valor: "Vender Imóvel", choice: "2", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3, valor: "Boleto", choice: "3", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 4, valor: "Transferência de lotes", choice: "4", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 5, valor: "Renegociação de parcelas", choice: "5", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 6, valor: "Jurídico", choice: "6", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 7, valor: "Outros", choice: "7", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 8, valor: "Terreno", choice: "1", templateId: 4, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 9, valor: "Apartamento", choice: "2", templateId: 4, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 10, valor: "Casa", choice: "3", templateId: 4, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 11, valor: "Chácara", choice: "4", templateId: 4, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 12, valor: "Rancho", choice: "5", templateId: 4, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 13, valor: "Outros", choice: "6", templateId: 4, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 14, valor: "Sim", choice: "1", templateId: 5, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 15, valor: "Não", choice: "2", templateId: 5, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 16, valor: "Sim", choice: "1", templateId: 7, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 17, valor: "Não", choice: "2", templateId: 7, createdAt: new Date(),
                updatedAt: new Date()
            },
        ]
        )
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("templateControls", {});
    }
}