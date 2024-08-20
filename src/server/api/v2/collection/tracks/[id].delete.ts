import {PrismaClient} from "@prisma/client";

/**
 * remove a song from the collection
 * */
export default defineEventHandler(async (event) => {
    let songIdParam = getRouterParam(event, 'id');

    if (songIdParam) {
        let songId: number;
        try { songId = parseInt(songIdParam); } catch (e) { throw Error('ID needs to be a number!') }

        deleteTrack(songId);


    } else throw Error('No ID given!');

});