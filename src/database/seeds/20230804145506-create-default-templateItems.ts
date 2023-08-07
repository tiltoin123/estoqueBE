import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            /* "templateControls", [
            { id: 1, valor: "1- Comprar imóveis tratar com Gabriela", choice: " 1 comprar ", templateId: 1 },
            { id: 2, valor: "2- Vender imóveis tratar com Gabriela", choice: " 2 vender ", templateId: 1 },
            { id: 3, valor: "3- Setor de finanças, (atraso, antecipação ou extravio de boletos) tratar com Débora", choice: " 3 financas finanças atraso antecipação antecipaçao antecipacao antecipacão extravio boletos ", templateId: 1 },
            { id: 4, valor: "4- Setor jurídico, renegociação e cessão de direitos", choice: " 4 jurídico juridico ", templateId: 1 },
            { id: 5, valor: "1- Casa", choice: " 1 casa ", templateId: 2 },
            { id: 6, valor: "2- Apartamento", choice: " 2 apartamento ap ", templateId: 2 },
            { id: 7, valor: "3- Barracão", choice: " 3 barracao barracão ", templateId: 2 },
            { id: 8, valor: "4- Terreno", choice: " 4 terreno ", templateId: 2 },
            { id: 9, valor: "5- Chácara", choice: " 5 chácara chacara ", templateId: 2 },
            { id: 10, valor: "6- Rancho", choice: " 6 rancho ", templateId: 2 },
            { id: 11, valor: "1- Chácara", choice: " 1 chácara chacara ", templateId: 3 },
            { id: 12, valor: "2- Apartamento", choice: " 2 apartamento ap ", templateId: 3 },
            { id: 13, valor: "3- Terreno", choice: " 3 terreno ", templateId: 3 },
            { id: 14, valor: "4- Casa", choice: " 4 casa ", templateId: 3 },
            { id: 15, valor: "1- Iniciar processo de renegociação.", choice: " 1 iniciar ", templateId: 14 },
            { id: 16, valor: "2- Continuar Renegociação já em andamento.", choice: " 2 continuar ", templateId: 14 },
            { id: 17, valor: "3- Cessão de direto de imóvel adquirido.", choice: " 3 cessao cessão ", templateId: 14 },
            { id: 18, valor: "1- Acima de R$1 milhão ", choice: " 1 acima milhão milhao", templateId: 22 },
            { id: 19, valor: "2- Entre R$500 mil e R$1 milhão ", choice: " 2 ", templateId: 22 },
            { id: 20, valor: "3- Entre R$280 mil e R$500 mil ", choice:" 3 ", templateId: 22 },
            { id: 21, valor: "4- Até R$280 mil", choice: " 4 ", templateId: 22 },
        ] */
            "templateControls", [
            { id: 1, valor: "Comprar imóveis tratar com Gabriela", choice: "1", templateId: 1 },
            { id: 2, valor: "2- Vender imóveis tratar com Gabriela", choice: "2", templateId: 1 },
            { id: 3, valor: "3- Setor de finanças, (atraso, antecipação ou extravio de boletos) tratar com Débora", choice: "3", templateId: 1 },
            { id: 4, valor: "4- Setor jurídico, renegociação e cessão de direitos", choice: "4", templateId: 1 },
            { id: 5, valor: "1- Casa", choice: "1", templateId: 2 },
            { id: 6, valor: "2- Apartamento", choice: "2", templateId: 2 },
            { id: 7, valor: "3- Barracão", choice: "3", templateId: 2 },
            { id: 8, valor: "4- Terreno", choice: "4", templateId: 2 },
            { id: 9, valor: "5- Chácara", choice: "5", templateId: 2 },
            { id: 10, valor: "6- Rancho", choice: "6", templateId: 2 },
            { id: 11, valor: "1- Chácara", choice: "1", templateId: 3 },
            { id: 12, valor: "2- Apartamento", choice: "2", templateId: 3 },
            { id: 13, valor: "3- Terreno", choice: "3", templateId: 3 },
            { id: 14, valor: "4- Casa", choice: "4", templateId: 3 },
            { id: 15, valor: "1- Iniciar processo de renegociação.", choice: "1", templateId: 14 },
            { id: 16, valor: "2- Continuar Renegociação já em andamento.", choice: "2", templateId: 14 },
            { id: 17, valor: "3- Cessão de direto de imóvel adquirido.", choice: "3", templateId: 14 },
            { id: 18, valor: "1- Acima de R$1 milhão ", choice: "1", templateId: 22 },
            { id: 19, valor: "2- Entre R$500 mil e R$1 milhão ", choice: "2", templateId: 22 },
            { id: 20, valor: "3- Entre R$280 mil e R$500 mil ", choice: "3", templateId: 22 },
            { id: 21, valor: "4- Até R$280 mil", choice: "4", templateId: 22 },
        ]
        )
    }
}