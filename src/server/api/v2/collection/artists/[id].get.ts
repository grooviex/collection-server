import { PrismaClient } from "@prisma/client";

/**
 * gets a specific song from the collection
 * */
export default defineEventHandler(async (event) => {
    let IDParam = getRouterParam(event, 'id');
    const prisma = new PrismaClient();

    if (IDParam) {
        let ID: number;
        try { ID = parseInt(IDParam); } catch (e) { throw Error('ID needs to be a number!') }

        return prisma.artist.findFirst({
            include: {
                albums: {
                    include: {
                        tracks: true,
                    },
                }}, where: {id: ID}});

    } else throw Error('No ID given!');
});