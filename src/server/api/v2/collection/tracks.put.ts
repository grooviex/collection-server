import { parseBuffer } from 'music-metadata';



import fs from 'fs';

import { AlbumType, Prisma, PrismaClient } from '@prisma/client'

import {MultiPartData} from "h3";

/**
 * puts a song into the collection
 * */
export default defineEventHandler(async (event) => {
    const prisma =  new PrismaClient();

    const multiPartData: MultiPartData[] | undefined = await readMultipartFormData(event);
    const songFile = multiPartData?.find(Boolean);

    if (songFile) {
        const songLocation: string = `src/public/collection/${songFile.filename}`;


        fs.writeFile(songLocation, songFile.data, (err) => {
            if (err) return console.error(err);
            console.log('File saved!');
        });

        const track = createTrack(await parseBuffer(songFile.data, songFile.type), songLocation);


        /* TODO: add checks (does album exist; does artist exist; etc.) */
        await prisma.track.create({data: track});

        return { data: track }

    } else { console.error("No song file found!"); }

});


function createTrack(metaData: any, songLocation: string): Prisma.TrackCreateInput {

    let artists: Prisma.ArtistCreateWithoutAlbumsInput[] = [];
    metaData.common.artists?.forEach(((value: string) => {
        artists.push({
            name: value,
            genres: metaData.common.genre
        });
    }));

    return {
        name: metaData.common.title,
        href: songLocation,
        duration: 180000,
        trackNumber: metaData.common.track.no,
        albums: { create: [
                {
                    name: metaData.common.album,
                    // TODO: Add collection sometime?
                    type: metaData.common.disk.of === 1 ? AlbumType.SINGLE : AlbumType.ALBUM,
                    totalTracks: metaData.common.track.of,
                    releaseDate: new Date(metaData.common.date),
                    cover: "ADD LATER",
                    artists: { create: artists }
                }]
        }}

}