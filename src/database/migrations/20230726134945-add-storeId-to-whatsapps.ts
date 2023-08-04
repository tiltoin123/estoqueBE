import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("Whatsapps", "storeId", {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: { model: "Stores", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("Whatsapps", "storeId");
    }
};
