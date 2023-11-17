import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "Suppliers",
            [
                {
                    razaoSocial: "ttestestes",
                    nomeFantasia: "loja teste 123",
                    cnpj: "62.173.620/0093-06",
                    tipoJur: "Mei",
                    endereco: "rua das flores,n123123 14409595 franca-sp",
                    email: "asdasdasdasd@hotmail.com",
                    telefone: "(16)3999-9999",
                    storeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    razaoSocial: "wserwer",
                    nomeFantasia: "loja teswerwerte 123",
                    cnpj: "62.173.620/0093-06",
                    tipoJur: "Mei",
                    endereco: "rua das batatas,n123123 14409595 franca-sp",
                    email: "asdasdasdasd@hotmail.com",
                    telefone: "(16)3999-9999",
                    storeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    razaoSocial: "ttestasdestes",
                    nomeFantasia: "loja asdteste 123",
                    cnpj: "62.173.620/0093-06",
                    tipoJur: "Mei",
                    endereco: "rua das aboboras,n123123 14409595 franca-sp",
                    email: "asdasdasdasd@hotmail.com",
                    telefone: "(16)3999-9999",
                    storeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    razaoSocial: "Empresa ABC",
                    nomeFantasia: "Loja XYZ",
                    cnpj: "62.173.620/0093-06",
                    tipoJur: "MEI",
                    endereco: "Rua das Flores, 123",
                    email: "empresa@exemplo.com",
                    telefone: "(00) 1234-5678",
                    storeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    razaoSocial: "Fornecedor 123",
                    nomeFantasia: "Loja Teste",
                    cnpj: "62.173.620/0093-06",
                    tipoJur: "LTDA",
                    endereco: "Av. Principal, 456",
                    email: "fornecedor@teste.com",
                    telefone: "(99) 8765-4321",
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
