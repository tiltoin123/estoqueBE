import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable("TemplateItems", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            item: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
        return queryInterface.dropTable("TemplateItems");
    }
};
