import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("Messages", "from", {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: false
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("Messages", "from");
    }
};
