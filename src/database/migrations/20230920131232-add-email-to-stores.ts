import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("Stores", "email", {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("Stores", "email");
    }
};
