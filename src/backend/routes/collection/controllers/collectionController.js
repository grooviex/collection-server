const musicMetadata = require('music-metadata');
const sequelize = require("sequelize");
const { Op } = require('@sequelize/core');
const fs = require('fs');

/* -- Models -- */
const songModel = require("../../../common/models/collection/songs.model");
const albumModel = require("../../../common/models/collection/albums.model");
const artistModel = require("../../../common/models/collection/artists.model");
const genreModel = require("../../../common/models/collection/genres.model");

/* --- Relation Models --- */
const songsArtistsModel = require("../../../common/models/collection/many-to-many/songs_artists.model")
const songsGenresModel = require("../../../common/models/collection/many-to-many/songs_genres.model")

async function createEntriesByMetadata(fileLocation) {
    const metadata = await musicMetadata.parseFile(fileLocation);

    let song = await songModel.buildSong({
        title: metadata['common']['title'],
        trackNumber: metadata['common']['track']['no'],
        releaseDate: metadata['common']['date'],
        duration: metadata['format']['duration'],
        audioCodec: metadata['format']['codec'],
        bitrate: metadata['format']['bitrate'],
        localLocation: fileLocation
    });

    let songExist = await songModel.findSong({where: {title: metadata['common']['title']}}).then(async (query) => { return !!query; });

    if (songExist) return {
        status: false,
        error: {
            message: `\`${metadata['common']['title']}\` is already in the Collection`,
        }
    };

    await albumModel.findAlbum({where: {name: metadata['common']['album']}}).then(async (query) => {

        if (query) {
            song['albumId'] = query['dataValues']['id'];
        } else {
            let album = await albumModel.addAlbum({ name: metadata['common']['album'] });
            song['albumId'] = album['dataValues']['id'];
        }

    });

    await song.save();

    /* Add many-to-many relations */
    let firstArtist = true;
    for (const e of metadata['common']['artists']) {
        let id;

        /* create artist and add to relation table */
        await artistModel.findArtist({where: {name: e}}).then(async (query) => {
            if (!query) {
                let artist = await artistModel.addArtist({name: e});
                id = artist['dataValues']['id'];
            } else id = query['dataValues']['id'];

            await songsArtistsModel.addRelation({
                songId: song['dataValues']['id'],
                artistId: id,
                isMainArtist: firstArtist
            });

        });
        firstArtist = false;
    }

    if (metadata['common']['genre']) {
        let firstGenre = true;
        for (const e of metadata['common']['genre']) {
            let id;

            /* create artist and add to relation table */
            await genreModel.findGenre({where: {name: e}}).then(async (query) => {
                if (!query) {
                    let genre = await genreModel.addGenre({ name: e });
                    id = genre['dataValues']['id'];
                } else id = query['dataValues']['id'];

                await songsGenresModel.addRelation({
                    songId: song['dataValues']['id'],
                    genreId: id,
                    isMainGenre: firstArtist
                });

            });

            firstGenre = false;
        }
    }

    return {
        status: true,
        result: {
            song: song
        }
    }

}

module.exports = {
    listSongs: async (req, res) => {
        try {
            res.status(200).json({
                status: true,
                error: {
                    message: await songModel.listAllSongs({limit: parseInt(req.body.limit)})
                }
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                error: {
                    message: 'Something did not work :(',
                    error: error.message
                }
            });
        }

    },

    add: async (req, res) => {
        try {
            const result = await createEntriesByMetadata('/usr/src/app/' + req.file.path);
            if (result.status) await res.status(result.status ? 200 : 500).json({ result });
        } catch (error) {
            res.status(500).json({
                status: false,
                error: {
                    message: 'Something did not work :(',
                    error: error.message
                }
            });
        }
    },

    /**
     * Options:
     * Soft delete: only delete song
     */
    remove: async (req, res) => {
        try {
            let removeType = req.body.type;
            let id = req.body.id;
            let song = await songModel.findSong({where: {id: id}, include: [artistModel.getModel(), genreModel.getModel()]}).then(async (query) => { return query; });

            if (!id) return res.status(500).json({
                status: false,
                error: {
                    message: `You need to enter an Id`,
                }
            });

            /* Delete entries */
            await songModel.destroySong({where: {id: id}});
            await fs.unlink(song['localLocation'], () => { console.log(`Removed file: \`${song['title']}\`, locally`) });

            if (removeType === 'soft_delete') return res.status(200).json({
                    status: true,
                    result: {
                        message: `Successfully removed: \`${song['title']}\``
                    }
                });

            await songModel.listAllSongs({where: {albumId: song['albumId']}}).then(async (query) => {
                if (!query || query.length <= 0) await albumModel.destroyAlbum({where: {id: song['albumId']}});
            });

            for (const artist of song['artists']) {
            await songsArtistsModel.listAllRelations({where: {artistId: artist['id']}}).then(async (query) => {
                    if (!query || query.length <= 0) await artistModel.destroyArtist({where: {id: artist['id']}});
                });
            }

            for (const genre of song['genres']) {
                await songsGenresModel.listAllRelations({where: {genreId: genre['id']}}).then(async (query) => {
                    if (!query || query.length <= 0) await genreModel.destroyGenre({where: {id: genre['id']}});
                });
            }


            return res.status(200).json({
                status: true,
                result: {
                    message: `Successfully removed: \`${song['title']}\``
                }
            });


        } catch (error) {
                res.status(500).json({
                    status: false,
                    error: {
                        message: 'Something did not work :(',
                        error: error.message
                    }
                });
        }
    },

    /**
     * one-way-sync: Searches for files in this folder, then syncs them
     */
    sync: async (req, res) => {
    try {
        let re = /(?:\.([^.]+))?$/; // regex for getting a file extension
        const allowedFileTypes = ['wav', 'mp3', 'flac', 'mpeg'];

        let files = fs.readdirSync('/usr/src/app/collection');


        let fileArray = [];
        if(files) {
            for (const file of files) {
                if(allowedFileTypes.includes(re.exec(file)[1])) {
                    try {
                        const result = await createEntriesByMetadata('/usr/src/app/collection/' + file);
                        if (result.status) fileArray.push(result.result.song);
                    } catch (e) {
                        res.status(500).json({
                            status: false,
                            error: {
                                message: e.message
                            }
                        })
                    }

                }
            }
        } else {
            return res.status(500).json({
                status: false,
                error: {
                    message: 'No new songs in the collection folder'
                }
            })
        }

        if (fileArray) return res.status(200).json({
            status: true,
            result: {
                songs: fileArray
            }
        })

    } catch (e) {
        return res.status(500).json({
            status: false,
            error: {
                message: e.message
            }
        })
    }

    },
}