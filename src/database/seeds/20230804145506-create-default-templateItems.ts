import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "templateItems", [
            { id: 1, item: "1- Comprar imóveis tratar com Gabriela\n", templateId: 1 },
            { id: 2, item: "2- Vender imóveis tratar com Gabriela\n", templateId: 1 },
            { id: 3, item: "3- Setor de finanças, (atraso, antecipação ou extravio de boletos) tratar com Débora\n", templateId: 1 },
            { id: 4, item: "4- Setor jurídico, renegociação e cessão de direitos\n", templateId: 1 },
            { id: 5, item: "1- Casa\n", templateId: 2 },
            { id: 6, item: "2- Apartamento\n", templateId: 2 },
            { id: 7, item: "3- Barracão\n", templateId: 2 },
            { id: 8, item: "4- Terreno\n", templateId: 2 },
            { id: 9, item: "5- Chácara\n", templateId: 2 },
            { id: 10, item: "6- Rancho\n", templateId: 2 },
            { id: 11, item: "1- Chácara\n", templateId: 3 },
            { id: 12, item: "2- Apartamento\n", templateId: 3 },
            { id: 13, item: "3- Terreno\n", templateId: 3 },
            { id: 14, item: "4- Casa\n", templateId: 3 },
            { id: 15, item: "1- Iniciar processo de renegociação.\n", templateId: 14 },
            { id: 16, item: "2- Renegociação já em andamento.\n", templateId: 14 },
            { id: 17, item: "3- Cessão de direto de imóvel adquirido.\n", templateId: 14 },
        ]
        )
    }
}