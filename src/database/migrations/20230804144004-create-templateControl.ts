import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable("TemplateControls", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            valor: {
                type: DataTypes.STRING,
                allowNull: false
            },
            choice: {
                type: DataTypes.STRING,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            templateId: {
                type: DataTypes.INTEGER,
                references: { model: "Template", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable("TemplateControls");
    }
};
