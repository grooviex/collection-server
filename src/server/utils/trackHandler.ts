import {AlbumType, Prisma} from "@prisma/client";

export function createTrackDatabaseEntriesContent(metaData: any, songLocation: string): Prisma.TrackCreateInput {
    return {
        name: metaData.common.title,
        href: songLocation,
        duration: metaData.format.duration, // TODO: turn that time in seconds
        trackNumber: metaData.common.track.no,
        albums: {connectOrCreate: {where: { name: metaData.common.album }, create: createAlbumDatabaseEntriesContent(metaData)}},
    }
}

export function createAlbumDatabaseEntriesContent(metaData: any, check = true): Prisma.AlbumCreateWithoutTracksInput {
    return {
        name: metaData.common.album,
        // TODO: Add collection sometime?
        type: metaData.common.track.of === 1 ? AlbumType.SINGLE : AlbumType.ALBUM,
        totalTracks: metaData.common.track.of,
        releaseDate: new Date(metaData.common.date),
        cover: "ADD LATER",
        artists: { connectOrCreate: createArtistDatabaseEntriesContent(metaData) }
    }
}


export function createArtistDatabaseEntriesContent(metaData: any, fromScratch: boolean = false): Prisma.ArtistCreateOrConnectWithoutAlbumsInput[] {
    let artistEntries: Prisma.ArtistCreateOrConnectWithoutAlbumsInput[] = [];

    metaData.common.artists?.forEach(((value: string) => {
        artistEntries.push({
            where: { name: value },
            create: {
                name: value,
                genres: metaData.common.genre
            }
        })
    }));


    return artistEntries;
}
