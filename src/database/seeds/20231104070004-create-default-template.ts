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
                    message: "${contactFullName}, como podemos auxiliá-lo hoje? Digite o número correspondente a opção que melhor atende sua necessidade.",
                    lastMessage: 1,
                    mediaType: "image/jpeg",
                    mediaContent: "C:\\git\\chatrock\\chatrock-api\\public\\1696534918798.jpg",
                    storeId: 1
                },
                {
                    id: 3,
                    message: "Que tipo de imóvel você está buscando?",
                    lastMessage: 2,
                    condition: "1",
                    storeId: 1
                },
                {
                    id: 4,
                    message: "Você gostaria de nos dar mais detalhes sobre o que está procurando?",
                    lastMessage: 3,
                    storeId: 1
                },
                {
                    id: 5,
                    message: "Você tem alguma região ou bairro específico em mente?",
                    lastMessage: 4,
                    condition: "1",
                    storeId: 1
                },
                {
                    id: 6,
                    message: "Você gostaria de colocar algum bem como parte do pagamento?",
                    lastMessage: 5,
                    storeId: 1
                },
                {
                    id: 7,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 4,
                    condition: "2",
                    queueId: 1,
                    storeId: 1
                },
                {
                    id: 8,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 6,
                    queueId: 1,
                    storeId: 1
                },
                {
                    id: 9,
                    message: "Está pensando em vender seu imóvel conosco ou tem alguma propriedade para negociar? Nos conte mais!",
                    lastMessage: 2,
                    condition: "2",
                    storeId: 1
                },
                {
                    id: 10,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 9,
                    queueId: 2,
                    storeId: 1
                },
                {
                    id: 11,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 2,
                    condition: "3",
                    queueId: 3,
                    storeId: 1
                },
                {
                    id: 12,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 2,
                    condition: "4",
                    queueId: 4,
                    storeId: 1
                },
                {
                    id: 13,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 2,
                    condition: "5",
                    queueId: 5,
                    storeId: 1
                },
                {
                    id: 14,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 2,
                    condition: "6",
                    queueId: 6,
                    storeId: 1
                },
                {
                    id: 15,
                    message: "Conte-nos, como podemos ajudá-lo?",
                    lastMessage: 2,
                    condition: "7",
                    storeId: 1
                },
                {
                    id: 16,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 15,
                    queueId: 7,
                    storeId: 1
                },
                {
                    id: 17,
                    message: "O Tio Fábio é a nossa inteligência artificial e está pronto para responder suas dúvidas e curiosidades sobre negócios imobiliários, faça uma pergunta!",
                    lastMessage: 2,
                    condition: "8",
                    queueId: 8,
                    storeId: 1
                },
                {
                    id: 18,
                    message: "Oi! Tudo bem? Aqui é da Imobiliária Dr. Fábio Liporoni. Muito obrigado por entrar em contato conosco. 😊 Poderia nos dizer seu nome completo, por favor?",
                    storeId: 1
                },
                {
                    id: 19,
                    message: "Agradecemos por compartilhar essas informações conosco! Já estamos dando prioridade à sua solicitação e encaminhamos para a equipe responsável." +
                        " Se estiver fora do horário comercial, fique tranquilo! Iremos atendê-lo o mais rápido possível ao retornarmos. Muito obrigado pela compreensão! 😊",
                    lastMessage: 18,
                    queueId: 1,
                    storeId: 1
                },
            ],
            {}
        );
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("Template", {});
    }
};
