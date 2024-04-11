const { DataTypes } = require("sequelize");

const artistsModel = {
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
        return this.model = sequelize.define('artists', artistsModel);
    },

    addArtist: (artist) => {
        return this.model.create(artist);
    },

    buildArtist: (artist) => {
        return this.model.build(artist);
    },

    destroyArtist: (options) => {
        return this.model.destroy(options);
    },

    findArtist: (options) => {
        return this.model.findOne(options);
    },

    listAllArtist: (options) => {
        return this.model.findAll(options);
    },


    getModel: () => {
        return this.model
    }
}