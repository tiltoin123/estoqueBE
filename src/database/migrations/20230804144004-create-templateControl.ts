import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable("TemplateControls", {
            id: {
                type: DataTypes.INTEGER,
<<<<<<< HEAD
=======
                autoIncrement: true,
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)
                primaryKey: true,
                allowNull: false
            },
            valor: {
                type: DataTypes.STRING,
                allowNull: false
            },
            choice: {
<<<<<<< HEAD
                type: DataTypes.STRING,
                allowNull: true
=======
                type: DataTypes.INTEGER,
                allowNull: false
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
<<<<<<< HEAD
=======
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
<<<<<<< HEAD
=======
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)
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
