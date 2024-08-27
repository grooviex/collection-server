import {Prisma, PrismaClient} from "@prisma/client";
import fs from "fs";
import { parseBuffer } from "music-metadata";
import {DefaultArgs, GetResult} from "@prisma/client/runtime/library";

export async function deleteTrack(songId: number) {
    const prisma = new PrismaClient();
    let deleteTrack = await prisma.track.delete({
        where: { id: songId },
    });

    let deleteAlbums = await prisma.album.deleteMany({
        where: {
            tracks: {
                none: {},
            },
        },
    });

    let deleteArtists = await prisma.artist.deleteMany({
        where: {
            albums: {
                none: {}
            }
        }
    });

    return [deleteTrack, deleteAlbums, deleteArtists]

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