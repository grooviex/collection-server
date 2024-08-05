import {parseBuffer} from 'music-metadata';

import fs from 'fs';
import { PrismaClient } from '@prisma/client'

/* TODO: fix jetbrains IDE error for not finding auto input */

/**
 * puts a song into the collection
 * */
export default defineEventHandler(async (event) => {
    const prisma =  new PrismaClient();

    const songLocation: string = `src/public/collection/${event.context.file.filename}`;

    const metaData = await parseBuffer(event.context.file.data, event.context.file.type);
    console.log(metaData.common.track.of);

    fs.writeFile(songLocation, event.context.file.data, (err) => {
        if (err) return console.error(err);
        console.log('File saved!');
    });
    const track = await createDatabaseEntriesContentByTrack(
        await parseBuffer(event.context.file.data, event.context.file.type),
        songLocation
    );


    await prisma.track.create({ data: track });

    return { data: track }
});

