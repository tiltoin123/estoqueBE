import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("Suppliers", "storeId", {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: { model: "Suppliers", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("Suppliers", "storeId");
    }
};
