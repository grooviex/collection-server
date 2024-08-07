import { PrismaClient } from "@prisma/client";

/**
 * gets a specific song from the collection
 * */
export default defineEventHandler(async (event) => {
    let songIdParam = getRouterParam(event, 'id');
    const prisma = new PrismaClient();

    if (songIdParam) {
        let songId: number;
        try {
            songId = parseInt(songIdParam);
        } catch (e) { throw Error('ID needs to be a number!') }

        return prisma.track.findFirst({where: {id: songId}});
    } else throw Error('No ID given!');


});