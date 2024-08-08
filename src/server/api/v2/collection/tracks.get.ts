import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();

    return prisma.track.findMany({
        include: {
            albums: {
                include: {
                    artists: true,
                }
            }
        }, take: event.context.track, skip: event.context.skil});


});