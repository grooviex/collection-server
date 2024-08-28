import {PrismaClient} from "@prisma/client";

/**
 * remove a song from the collection
 * */
export default defineEventHandler(async (event) => {
    let songIdParam = getRouterParam(event, 'id');

    if (songIdParam) {
        return await deleteTrack(stringToNumber(songIdParam));
    } else throw Error('No ID given!');

});