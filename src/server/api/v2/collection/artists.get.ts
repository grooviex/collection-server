import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();

    return prisma.artist.findMany({
        include: {
            albums: {
                include: {
                    tracks: true,
                }
            },
        }, take: event.context.take, skip: event.context.skip});


});