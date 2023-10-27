import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "TemplateControls", [
            {
                id: 1, valor: "Comprar Imóvel", choice: "1", templateId: 2, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 2, valor: "Vender Imóvel", choice: "2", templateId: 2, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 3, valor: "Boleto", choice: "3", templateId: 2, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 4, valor: "Transferência de lotes", choice: "4", templateId: 2, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 5, valor: "Renegociação de parcelas", choice: "5", templateId: 2, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 6, valor: "Jurídico", choice: "6", templateId: 2, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 7, valor: "Outros", choice: "7", templateId: 2, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false,
            },
            {
                id: 8, valor: "Inteligência artificial Tio Fábio", choice: "8", templateId: 2, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false,
            },
            {
                id: 9, valor: "Terreno", choice: "1", templateId: 3, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 10, valor: "Apartamento", choice: "2", templateId: 3, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 11, valor: "Casa", choice: "3", templateId: 3, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 12, valor: "Chácara", choice: "4", templateId: 3, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 13, valor: "Rancho", choice: "5", templateId: 3, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 14, valor: "Outros", choice: "6", templateId: 3, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 15, valor: "Voltar ao menu principal", choice: "0", templateId: 3, createdAt: new Date(),
                updatedAt: new Date(), backMenu: true
            },
            {
                id: 16, valor: "Sim", choice: "1", templateId: 4, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 17, valor: "Não", choice: "2", templateId: 4, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 18, valor: "Voltar ao menu principal", choice: "0", templateId: 4, createdAt: new Date(),
                updatedAt: new Date(), backMenu: true
            },
            {
                id: 19, valor: "Sim", choice: "1", templateId: 6, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 20, valor: "Não", choice: "2", templateId: 6, createdAt: new Date(),
                updatedAt: new Date(), backMenu: false
            },
            {
                id: 21, valor: "Voltar ao menu principal", choice: "0", templateId: 6, createdAt: new Date(),
                updatedAt: new Date(), backMenu: true
            },
        ]
        )
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("TemplateControls", {});
    }
}