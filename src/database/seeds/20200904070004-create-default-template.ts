import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "Template",
            [
                {
                    id: 1, message: "Olá, a Imobiliária Fábio Liporoni agradece o contato, envie a opção desejada para prosseguirmos com o seu atendimento",
                    lastMessage: 0,
                    queueId: 1, storeId: 1
                },
                { id: 2, message: "Que tipo de imóvel deseja comprar?", lastMessage: 1, condition: "1", storeId: 1 },
                { id: 3, message: "Você está buscando um imóvel em qual faixa de valor?", lastMessage: 2, storeId: 1 },
                { id: 4, message: "Em quais regiões da cidade ou bairros são suas preferências? Digite abaixo", lastMessage: 3, storeId: 1 },
                { id: 5, message: "Entendi. Por favor envie alguns dados do imóvel em questão,", lastMessage: 1, condition: "2", storeId: 1 },
                { id: 6, message: "Qual a metragem do terreno?", lastMessage: 5, storeId: 1 },
                { id: 7, message: "Qual a área construída do imóvel?", lastMessage: 6, storeId: 1 },
                { id: 8, message: "Qual a localização do imóvel?", lastMessage: 7, storeId: 1 },
                { id: 9, message: "O imóvel em questão está regularizado?", lastMessage: 8, storeId: 1 },
                {
                    id: 10,
                    message: "Ok, por favor me envie os seguintes dados para prosseguir o atendimento.\n" +
                        "Qual seu nome completo?",
                    condition: "3",
                    lastMessage: 1, storeId: 1
                },
                { id: 11, message: "Qual o loteamento do imóvel?", lastMessage: 10, storeId: 1 },
                { id: 12, message: "Qual a quadra e o lote do imóvel em questão?", lastMessage: 11, storeId: 1 },
                { id: 13, message: "Qual a assunto deseja tratar com o financeiro(boletos perdidos ou atrasados, antecipação de parcelas, reimpressão?", lastMessage: 12, storeId: 1 },
                { id: 14, message: "Então você quer falar com alguém do setor jurídico, de qual assunto deseja tratar?", lastMessage: 1, condition: "4", storeId: 1 },
                { id: 15, message: "Por favor me envie alguns dados para prosseguir o atendimento.\n" + "Qual o nome do loteamento?", lastMessage: 14, condition: "1", storeId: 1 },
                { id: 16, message: "Qual a quadra e lote do imóvel?", lastMessage: 15, storeId: 1 },
                { id: 17, message: "Qual o nome do empreendimento?", lastMessage: 16, storeId: 1 },
                { id: 18, message: "Este imóvel já se encontra em processo de renegociação?", lastMessage: 17, storeId: 1 },
                {
                    id: 19, message: "Obrigado pela cooperação, a Gabriela do setor de vendas recebeu um relatório sobre o que você precisa e retornará seu contato o quanto antes.",
                    lastMessage: 4, queueId: 2, storeId: 1
                },
                {
                    id: 20, message: "Obrigado pela cooperação, a Gabriela do setor de compras recebeu um relatório sobre o que você precisa e retornará seu contato o quanto antes.",
                    lastMessage: 9, queueId: 3, storeId: 1
                },
                {
                    id: 21, message: "Obrigado pela cooperação, a Débora do setor de finanças recebeu um relatório sobre o que você precisa e retornará seu contato o quanto antes.",
                    lastMessage: 13, queueId: 4, storeId: 1
                },
                {
                    id: 22, message: "Obrigado pela cooperação, a Gabriela recebeu um relatório sobre o que você precisa e retornará seu contato para tratar da cessão de direito do imóvel o quanto antes.",
                    lastMessage: 14, condition: "2", queueId: 5, storeId: 1
                },
                {
                    id: 23, message: "Obrigado pela cooperação, a Ângela do setor de jurídico recebeu um relatório sobre o que você precisa e retornará seu contato o quanto antes.",
                    lastMessage: 18, queueId: 5, storeId: 1
                },
            ],
            {}
        );
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("Template", {});
    }
};