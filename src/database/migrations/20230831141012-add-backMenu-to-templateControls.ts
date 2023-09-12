import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("TemplateControls", "backMenu", {
            type: DataTypes.BOOLEAN,
            allowNull: false
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("TemplateControls", "backMenu");
    }
};
