import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "Products",
            [
                {
                    name: "Macarrão parafuso 500g",
                    description: "O Macarrão Dona Geralda é uma opção deliciosa e versátil para suas receitas. Seu formato de parafuso, com uma estrutura espiralada, oferece um design único que ajuda a reter molhos e temperos, garantindo uma experiência saborosa em cada mordida.",
                    price: 299,
                    unity: "unidade",
                    quantity: 123,
                    storeId: 1,
                    supplierId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: "Manual de montagem de encanamentos",
                    description: "Com este manual você aprenderá como montar encanamentos domésticos, para agua fria e quente, tipos de canos e conexões, excelente para construtores e encanadores iniciantes.",
                    price: 1499,
                    unity: "unidade",
                    quantity: 1233,
                    storeId: 1,
                    supplierId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Corda para escalada 1"',
                    description: "Corda de nylon para escalada, resistente a fricção, capaz de suportar até 2000kg.",
                    price: 899,
                    unity: "metro",
                    quantity: 1123123,
                    storeId: 1,
                    supplierId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: "massa de calafetar",
                    description: "Usada para vedações em janelas e portas, reparos em rachaduras, reparos em banheiros e cozinhas.",
                    price: 899,
                    unity: "kilograma",
                    quantity: 1123123,
                    storeId: 1,
                    supplierId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ],
            {}
        );
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete("Products", {});
    }
};
