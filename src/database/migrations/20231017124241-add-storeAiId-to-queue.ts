import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("Queues", "storeAiId", {
            type: DataTypes.INTEGER,
            references: { model: "StoreAi", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("Queues", "storeAiId");
    }
};
