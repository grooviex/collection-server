const { DataTypes } = require("sequelize");

const SongsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    trackNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },

    albumId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'albums',
            key: 'id'
        }
    },

    releaseDate: {
        type: DataTypes.DATE,
    },

    /* TODO: find other way */
/*    genres: {
        type: DataTypes.ARRAY(DataTypes.TEXT)
    },*/

    duration: {
      type: DataTypes.INTEGER,
        allowNull: false
    },

    audioCodec: {
        type: DataTypes.STRING
    },

    bitrate: {
        type: DataTypes.INTEGER
    },

    localLocation: {
        type: DataTypes.STRING,
    },

};

module.exports = {
    init: (sequelize) => {
        return this.model = sequelize.define('songs', SongsModel);
    },

    addSong: (song) => {
        return this.model.create(song);
    },

    buildSong: (song) => {
        return this.model.build(song);
    },

    findSong: (options) => {
        return this.model.findOne(options);
    },

    destroySong: (options) => {
      return this.model.destroy(options);
    },

    listAllSongs: (options) => {
        return this.model.findAll(options);
    },

    getModel: () => {
        return this.model
    }
}