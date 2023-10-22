import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("Users", "confirmationToken", {
            type: DataTypes.STRING,
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            unique: true
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("Users", "storeId");
    }
};
