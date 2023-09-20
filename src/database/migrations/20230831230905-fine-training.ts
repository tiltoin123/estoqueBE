import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable("FineTraining", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            context: {
                type: DataTypes.STRING,
                allowNull: false
            },
            storeId: {
                type: DataTypes.INTEGER,
                references: { model: "Stores", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false
            },
            userMessage: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            assistentMessage: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable("FineTraining");
    }
};
