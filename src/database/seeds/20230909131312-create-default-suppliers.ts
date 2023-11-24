import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "Suppliers",
            [
                {
                    razaoSocial: "Sabor Natural Indústria e Comércio de Alimentos S.A",
                    nomeFantasia: "Macarrão Dona Geralda",
                    cnpj: "62.173.620/0093-06",
                    tipoJur: "S.A",
                    endereco: "rua das flores,3123 cep:14404-232 franca-sp",
                    email: "donageralda@macarrao.com",
                    telefone: "(16)3999-9999",
                    storeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    razaoSocial: " Páginas Vividas Editora e Livraria LTDA",
                    nomeFantasia: "Livraria Ronaldo nazário",
                    cnpj: "98.741.258/0001-63",
                    tipoJur: "ltda",
                    endereco: "rua batatais,971 cep:14425-095 franca-sp",
                    email: "ronaldo@livraria.com.br",
                    telefone: "(16)3239-0235",
                    storeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    razaoSocial: "Jazer artigos esportivos LTDA",
                    nomeFantasia: "Jazer artigos esportivos",
                    cnpj: "35.823.941/0001-70",
                    tipoJur: "ltda",
                    endereco: "rua Josivaldo aroeira,2132 cep:14445-204 franca-sp",
                    email: "jazer@esportes.com",
                    telefone: "(16)3213-0612",
                    storeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    razaoSocial: "Jorge e silva materiais eireli",
                    nomeFantasia: "Pedra silva materiais para construção",
                    cnpj: "12.456.789/0001-01",
                    tipoJur: "eireli",
                    endereco: "Avenida Brasil, 123 cep:14402-324 franca-sp",
                    email: "pedrasilva@construcao.com",
                    telefone: "(16) 3221-5678",
                    storeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    razaoSocial: "Edvaldo silva artesanatos",
                    nomeFantasia: "Edvaldo artesanatos",
                    cnpj: "83.235.765/0001-82",
                    tipoJur: "mei",
                    endereco: "Av. Presidente Vargas, 856",
                    email: "edvaldoartesanato@gmail.com",
                    telefone: "(16) 98765-4321",
                    storeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("Suppliers", {});
    }
};
