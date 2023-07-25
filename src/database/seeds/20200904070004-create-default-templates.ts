import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "Templates",
            [
                {
                    id: 1,
                    message: "Olá, a Imobiliária Fábio Liporoni agradece o contato, envie a opção desejada para prosseguirmos com o seu atendimento\n" +
                        "1- Comprar imóveis tratar com Gabriela\n" +
                        "2- Vender imóveis tratar com Gabriela\n" +
                        "3- Setor de finanças, (atraso, antecipação ou extravio de boletos) tratar com Débora\n" +
                        "4- Setor jurídico, renegociação e cessão de direitos",
                    lastMessage: 0,
                    queueId: 1
                },
                {
                    id: 2,
                    message: "Que tipo de imóvel deseja comprar?\n" +
                        "1- Casa\n" +
                        "2- Apartamento\n" +
                        "3- Barracão\n" +
                        "4- Terreno\n" +
                        "5- Chácara\n" +
                        "6- Rancho\n" +
                        "7- Área",
                    lastMessage: 1,
                    condition: "1 um primeiro comprar compra",
                    nextMessage: 17
                },
                {
                    id: 3,
                    message: "Entendi. Por favor envie alguns dados do imóvel em questão,\n" +
                        "1- Chácara\n" +
                        "2- Apartamento\n" +
                        "3- Terreno\n" +
                        "4- Casa\n",
                    lastMessage: 1,
                    condition: "2 dois segunda vender venda vende",
                    nextMessage: 4
                },
                { id: 4, message: "Qual a metragem do imóvel?", lastMessage: 3, condition: "1 um primeira chácara chacara 3 terceira tres três terreno", nextMessage: 6 },
                { id: 5, message: "Qual a área construída do imóvel?", lastMessage: 3, condition: "2 ap apartamento segunda dois casa 4 quatro quarta", nextMessage: 6 },
                { id: 6, message: "Qual a localização do imóvel?", lastMessage: 5 },
                { id: 7, message: "O imóvel em questão está regularizado?", lastMessage: 6, nextMessage: 18 },
                {
                    id: 8,
                    message: "Ok, por favor me envie os seguintes dados para prosseguir o atendimento.\n" +
                        "Qual seu nome completo?",
                    condition: "3 financeiro finanças financas debora débora atraso antecipação antecipacao boleto",
                    lastMessage: 1, nextMessage: 18
                },
                { id: 9, message: "Qual o loteamento do imóvel?", lastMessage: 8 },
                { id: 10, message: "Qual a quadra e o lote do imóvel em questão?", lastMessage: 9 },
                { id: 11, message: "Qual a assunto deseja tratar com o financeiro(boletos perdidos ou atrasados, antecipação de parcelas, reimpressão?", lastMessage: 10, nextMessage: 19 },
                {
                    id: 12,
                    message: "Então você quer falar com alguém do setor jurídico, por favor me envie alguns dados para prosseguir o atendimento.\n" +
                        "Qual o nome do loteamento?",
                    lastMessage: 1,
                    condition: "4 jurídico renegociação juridico renegociacao renegociaçao"
                },
                { id: 13, message: "Qual a quadra e lote do imóvel?", lastMessage: 12 },
                { id: 14, message: "Qual o nome do empreendimento?", lastMessage: 13 },
                {
                    id: 15, message: "De qual assunto deseja tratar?\n" +
                        "1- Iniciar processo de renegociação.\n" +
                        "2- Renegociação já em andamento.\n" +
                        "3- Cessão de direto de imóvel adquirido.",
                    lastMessage: 14
                },
                { id: 17, message: "Obrigado pela cooperação, a Gabriela do setor de vendas recebeu um relatório sobre o que você precisa e retornará seu contato o quanto antes.", lastMessage: 2, queueId: 2 },
                { id: 18, message: "Obrigado pela cooperação, a Gabriela do setor de compras recebeu um relatório sobre o que você precisa e retornará seu contato o quanto antes.", lastMessage: 8, queueId: 3 },
                { id: 19, message: "Obrigado pela cooperação, a Débora do setor de finanças recebeu um relatório sobre o que você precisa e retornará seu contato o quanto antes.", lastMessage: 11, queueId: 4 },
                { id: 20, message: "Obrigado pela cooperação, a Ângela do setor de jurídico recebeu um relatório sobre o que você precisa e retornará seu contato o quanto antes.", lastMessage: 15, condition: " 1 renegociacao renegociação renegociaçao renegociacão iniciar processo 2", queueId: 5 },
                {
                    id: 21, message: "Obrigado pela cooperação, a Gabriela recebeu um relatório sobre o que você precisa e retornará seu contato para tratar da cessão de direito do imóvel o quanto antes.",
                    lastMessage: 15, condition: " 3 cessão direto imóvel adquirido imovel ", queueId: 5
                },
            ],
            {}
        );
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("Templates", {});
    }
};