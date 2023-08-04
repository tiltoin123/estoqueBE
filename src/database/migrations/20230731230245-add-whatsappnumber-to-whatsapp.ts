import { QueryInterface, DataTypes } from "sequelize";
module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn("Whatsapps", "whatsappNumber", {
            type: DataTypes.STRING,
            allowNull: true
        });
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn("Whatsapps", "whatsappNumber");
    }
};