import {Prisma, PrismaClient} from "@prisma/client";
import fs from "fs";
import { parseBuffer } from "music-metadata";
import {DefaultArgs, GetResult} from "@prisma/client/runtime/library";

export async function deleteTrack(songId: number) {
    const prisma = new PrismaClient();
    let track = await prisma.track.delete({
        where: { id: songId },
        include: { albums: { include: { artists: true }
        }}});

    let album = await prisma.album.findFirst({where: {
            id: track.albums[0].id,
            tracks: {
                some: {},
            },
        }});

    return album;

    if (!album) {
        album = await prisma.album.delete({where: {id: track.albums[0].id}, include: { artists: true }});
        return album.artists;
    }
}

export async function createTrack(file: any): Promise<Prisma.Prisma__TrackClient<GetResult<Prisma.$TrackPayload<DefaultArgs>, {
    data: any
}, "create">, never, DefaultArgs>> {
    const prisma =  new PrismaClient();
    const songLocation: string = `src/public/collection/${file.filename}`;
    const metaData = await parseBuffer(file.data, file.type);

    fs.writeFile(songLocation, file.data, (err) => { if (err) throw new Error(err.message) });

    const track = createTrackDatabaseEntriesContent(
        await parseBuffer(file.data, file.type),
        songLocation
    );

    let createdTrack = await prisma.track.create({ data: track });

    let albumExists = Boolean(prisma.album.findFirst({where: { name: metaData.common.album }}));
    if (albumExists) await prisma.album.update({where: {name: metaData.common.album}, data: createAlbumDatabaseEntriesContent(metaData)})
    return createdTrack;
}