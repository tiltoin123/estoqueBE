import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("Messages", "hasLink", {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("Messages", "hasLink");
    }
};
