import { parseBuffer } from 'music-metadata';
import fs from 'fs';

/**
 * puts a song into the collection
 * */
export default defineEventHandler(async (event) => {
    let songFile = await readMultipartFormData(event);
    songFile = songFile[0];

    fs.writeFile('src/public/collection/' +  songFile.filename, songFile.data, (err) => {
        if (err) return console.error(err);
        console.log('File saved!');
    });

    const result = await parseBuffer(songFile.data, songFile.type);
    return {
        id: '', // integer; Database ID
        name: '', // string; Song Name
        href: '', // string; a link to the local location of Song (TODO: Web API?)
        song_id: '', // string; UUID for song
        disc_number: 1, // integer; Number of the Disk
        duration_ms: 0, // integer; duration of the Song in ms
        local_location: '', // string; the local location of the Song file
        track_number: 0, // integer; the number of the track

        album: {
            id: 0, // integer; Database ID,
            name: '', // string; Album Name
            album_id: '', // string: UUID for album
            album_type: '', // string; types: album; single; compilation
            total_tracks: 9, // integer; Amount of Songs on the album
            cover: {
                // TODO: Buffer or cached?
            },
            release_date: 2024, // integer; date when album was released.
            artists: [
                {
                    id: 1, // integer; Database ID
                    artist_id: '', // String; Artists UUID
                    name: '', // String; Artists Name
                    genres: [], // Array; List of Genres from the artist
                    cover: {
                        // TODO: Buffer or cached?
                    }
                }
            ]

        },

        artist: {
            id: 1, // integer; Database ID
            artist_id: '', // String; Artists UUID
            name: '', // String; Artists Name
            genres: [], // Array; List of Genres from the artist
            cover: {
                // TODO: Buffer or cached?
            }
        },


    }
});