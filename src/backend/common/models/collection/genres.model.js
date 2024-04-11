const { DataTypes } = require("sequelize");

const GenresModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
};

module.exports = {
    init: (sequelize) => {
        return this.model = sequelize.define('genres', GenresModel);
    },

    addGenre: (genre) => {
        return this.model.create(genre);
    },

    destroyGenre: (options) => {
        return this.model.destroy(options);
    },

    buildGenre: (genre) => {
        return this.model.build(genre);
    },
    findGenre: (options) => {
        return this.model.findOne(options);
    },


    getModel: () => {
        return this.model
    }
}