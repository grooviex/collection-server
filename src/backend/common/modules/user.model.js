const { DataTypes} = require("sequelize");
const {roles} = require("../../../config");

const UserModel = {
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
        this.model = sequelize.define('user', UserModel);
    },
    createUser: (user) => {
        return this.model.create(user);
    },
    findAllUsers: (query) => {
        /* TODO: Find all is not a function, fix Model */
        return this.model.findAll({
            where: query
        });
    },
}