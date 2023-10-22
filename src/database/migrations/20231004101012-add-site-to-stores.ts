import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("Stores", "siteUrl", {
            type: DataTypes.STRING,
            unique: true
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("Stores", "siteUrl");
    }
};
