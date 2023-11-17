import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable("Suppliers", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            cnpj: {
                type: DataTypes.STRING,
                allowNull: false
            },
            razaoSocial: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nomeFantasia: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tipoJur: {
                type: DataTypes.STRING,
                allowNull: false
            },
            endereco: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            telefone: {
                type: DataTypes.STRING,
                allowNull: false
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
        return queryInterface.dropTable("Users");
    }
};
