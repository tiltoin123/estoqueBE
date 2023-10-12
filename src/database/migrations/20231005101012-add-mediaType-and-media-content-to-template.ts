import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return Promise.all([
            queryInterface.addColumn("Template", "mediaType", {
                type: DataTypes.BLOB,
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }),
            queryInterface.addColumn("Template", "mediaContent", {
                type: DataTypes.STRING,
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }),
        ]);
    },

    down: (queryInterface: QueryInterface) => {
        return Promise.all([
            queryInterface.removeColumn("Template", "mediaType"),
            queryInterface.removeColumn("Template", "mediaContent"),
        ]);
    }
};
