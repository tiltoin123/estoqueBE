import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable("StoreLinks", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            utility: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            link: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            storeId: {
                type: DataTypes.INTEGER,
                references: { model: "Stores", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable("StoreLinks");
    }
};
