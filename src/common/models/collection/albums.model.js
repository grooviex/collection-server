const { DataTypes } = require("sequelize");

const AlbumsModel = {
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
        return this.model = sequelize.define('albums', AlbumsModel);
    },

    addAlbum: (album) => {
        return this.model.create(album);
    },

    buildAlbum: (album) => {
        return this.model.build(album);
    },

    destroyAlbum: (options) => {
        return this.model.destroy(options);
    },

    findAlbum: (options) => {
        return this.model.findOne(options);
    },

    listAllAlbums: (options) => {
        return this.model.findAll(options);
    },

    getModel: () => {
        return this.model
    }
}