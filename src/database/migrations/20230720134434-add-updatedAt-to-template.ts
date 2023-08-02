import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {

        return queryInterface.addColumn('Template', 'updatedAt', {
            type: DataTypes.DATE(6),
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)')
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn('Template', 'updatedAt');
    },
};
