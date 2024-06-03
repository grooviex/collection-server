const { DataTypes } = require("sequelize");
const {roles } = require("../../config");

const UsersModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: roles.USER
    },
};

module.exports = {
    init: (sequelize) => {
        return this.model = sequelize.define('users', UsersModel);
    },

    createUser: (user) => {
        return this.model.create(user);
    },

    findAllUsers: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    findUser: (query) => {
        return this.model.findOne({
            where: query,
        });
    }
}