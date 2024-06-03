const { DataTypes } = require("sequelize");

const songs = require("../songs.model");
const artists = require("../artists.model");

const SongsArtistsModel = {
    songId: {
      type: DataTypes.INTEGER,
      references: {
          model: songs,
          key: 'id'
      }
    },
    artistId: {
      type: DataTypes.INTEGER,
      references: {
          model: artists,
          key: 'id'
      }
    },
    isMainArtist: DataTypes.BOOLEAN
};

module.exports = {
    init: (sequelize) => {
        return this.model = sequelize.define('Songs_Artists', SongsArtistsModel);
    },

    addRelation: (relation) => {
        return this.model.create(relation);
    },

    destroyRelation: (options) => {
        return this.model.destroy(options);
    },

    listAllRelations: (options) => {
        return this.model.findAll(options);
    }
}