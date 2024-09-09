import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();

    return prisma.album.findMany({
        include: {
            tracks: true,
            artists: true,
        }, take: event.context.take, skip: event.context.skip});


});