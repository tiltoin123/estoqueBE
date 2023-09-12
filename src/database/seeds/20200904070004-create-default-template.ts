import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "Template",
            [
                {
                    id: 1,
                    message: "Oi! Tudo bem? Aqui é da Imobiliária Dr. Fábio Liporoni. Muito obrigado por entrar em contato conosco. 😊 Poderia nos dizer seu nome completo, por favor?",
                    storeId: 1
                },
                {
                    id: 2,
                    message: "Seu nome foi atualizado no nosso banco de dados. Para continuar o atendimento envie mais uma mensagem.",
                    lastMessage: 1,
                    storeId: 1
                },
                {
                    id: 3,
                    message: "Como podemos auxiliá-lo hoje? Digite o número correspondente a opção que melhor atende sua necessidade.",
                    lastMessage: 2,
                    storeId: 1
                },
                {
                    id: 4,
                    message: "Que tipo de imóvel você está buscando?",
                    lastMessage: 3,
                    condition: "1",
                    storeId: 1
                },
                {
                    id: 5,
                    message: "Você gostaria de nos dar mais detalhes sobre o que está procurando?",
                    lastMessage: 4,
                    storeId: 1
                },
                {
                    id: 6,
                    message: "Você tem alguma região ou bairro específico em mente?",
                    lastMessage: 5,
                    condition: "1",
                    storeId: 1
                },
                {
                    id: 7,
                    message: "Você gostaria de colocar algum bem como parte do pagamento?",
                    lastMessage: 6,
                    storeId: 1
                },
                {
                    id: 8,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 5,
                    condition: "2",
                    queueId: 1,
                    storeId: 1
                },
                {
                    id: 9,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 7,
                    queueId: 1,
                    storeId: 1
                },
                {
                    id: 10,
                    message: "Está pensando em vender seu imóvel conosco ou tem alguma propriedade para negociar? Nos conte mais!",
                    lastMessage: 3,
                    condition: "2",
                    storeId: 1
                },
                {
                    id: 11,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 10,
                    queueId: 2,
                    storeId: 1
                },
                {
                    id: 12,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 3,
                    condition: "3",
                    queueId: 3,
                    storeId: 1
                },
                {
                    id: 13,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 3,
                    condition: "4",
                    queueId: 4,
                    storeId: 1
                },
                {
                    id: 14,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 3,
                    condition: "5",
                    queueId: 5,
                    storeId: 1
                },
                {
                    id: 15,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 3,
                    condition: "6",
                    queueId: 6,
                    storeId: 1
                },
                {
                    id: 16,
                    message: "Conte-nos, como podemos ajudá-lo?",
                    lastMessage: 3,
                    condition: "7",
                    storeId: 1
                },
                {
                    id: 17,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 16,
                    queueId: 7,
                    storeId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("Template", {});
    }
};
