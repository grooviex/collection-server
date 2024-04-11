const { DataTypes } = require("sequelize");

const songs = require("./../songs.model");
const genres = require("./../genres.model");

const SongsGenresModel = {
    songId: {
        type: DataTypes.INTEGER,
        references: {
            model: songs,
            key: 'id'
        }
    },
    genreId: {
        type: DataTypes.INTEGER,
        references: {
            model: genres,
            key: 'id'
        }
    },
    isMainGenre: DataTypes.BOOLEAN
};

module.exports = {
    init: (sequelize) => {
        return this.model = sequelize.define('Songs_Genres', SongsGenresModel);
    },

    addRelation: (relation) => {
        return this.model.create(relation);
    },

    listAllRelations: (options) => {
        return this.model.findAll(options);
    }
}