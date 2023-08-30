import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.addColumn("Messages", "templateId", {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "Template", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION"
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.removeColumn("Messages", "templateId");
    }
};
