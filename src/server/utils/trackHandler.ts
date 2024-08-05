import {AlbumType, Prisma, PrismaClient} from "@prisma/client";

export async function createDatabaseEntriesContentByTrack(metaData: any, songLocation: string): Promise<Prisma.TrackCreateInput> {
    let artistEntries: Prisma.ArtistCreateOrConnectWithoutAlbumsInput[] = [];

    metaData.common.artists?.forEach(( async (value: string) => {
                 artistEntries.push({
                where: { name: value },
                create: {
                    name: value,
                    genres: metaData.common.genre
                }
            })
    }));

    return {
        name: metaData.common.title,
        href: songLocation,
        duration: metaData.format.duration, // TODO: turn that time in seconds
        trackNumber: metaData.common.track.no,
        albums: { connectOrCreate: {
                where: {name: metaData.common.album},
                create: {
                    name: metaData.common.album,
                    // TODO: Add collection sometime?
                    type: metaData.common.track.of === 1 ? AlbumType.SINGLE : AlbumType.ALBUM,
                    totalTracks: metaData.common.track.of,
                    releaseDate: new Date(metaData.common.date),
                    cover: "ADD LATER",
                    artists: { connectOrCreate: artistEntries }
                }
        }},
    }
}