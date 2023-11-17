import { QueryInterface } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert(
            "Products",
            [
                {
                    name: "ttestestes",
                    description: "43563454356/67856782349",
                    price: 1999,
                    unity: "gramas",
                    quantity: 123,
                    storeId: 1,
                    supplierId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: "fghedrt",
                    description: "sdrrwertaerteras/wertasert",
                    price: 1499,
                    unity: "unidades",
                    quantity: 1233,
                    storeId: 1,
                    supplierId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: "asdaserwerwe4",
                    description: "w/werwerwe",
                    price: 999,
                    unity: "metro",
                    quantity: 1123123,
                    storeId: 1,
                    supplierId: 1,
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
