import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "templateControls", [
            {
                id: 1, valor: "Comprar imóveis tratar com Gabriela", choice: "1", templateId: 1, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2, valor: "Vender imóveis tratar com Gabriela", choice: "2", templateId: 1, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3, valor: "Setor de finanças, (atraso, antecipação ou extravio de boletos) tratar com Débora", choice: "3", templateId: 1, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 4, valor: "Setor jurídico, renegociação e cessão de direitos", choice: "4", templateId: 1, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 5, valor: "Casa", choice: "1", templateId: 2, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 6, valor: "Apartamento", choice: "2", templateId: 2, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 7, valor: "Barracão", choice: "3", templateId: 2, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 8, valor: "Terreno", choice: "4", templateId: 2, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 9, valor: "Chácara", choice: "5", templateId: 2, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 10, valor: "Rancho", choice: "6", templateId: 2, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 11, valor: "Chácara", choice: "1", templateId: 5, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 12, valor: "Apartamento", choice: "2", templateId: 5, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 13, valor: "Terreno", choice: "3", templateId: 5, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 14, valor: "Casa", choice: "4", templateId: 5, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 15, valor: "Processo de renegociação.", choice: "1", templateId: 14, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 17, valor: "Cessão de direto de imóvel adquirido.", choice: "2", templateId: 14, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 18, valor: "Acima de R$1 milhão ", choice: "1", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 19, valor: "Entre R$500 mil e R$1 milhão ", choice: "2", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 20, valor: "Entre R$265 mil e R$500 mil ", choice: "3", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 21, valor: "Até R$265 mil", choice: "4", templateId: 3, createdAt: new Date(),
                updatedAt: new Date()
            },
        ]
        )
    }
}