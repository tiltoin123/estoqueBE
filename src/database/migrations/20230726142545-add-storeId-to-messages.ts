import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("Messages", "storeId", {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: { model: "Stores", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("Messages", "storeId");
    }
};