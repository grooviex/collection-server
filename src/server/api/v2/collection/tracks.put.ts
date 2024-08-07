import {parseBuffer} from 'music-metadata';

import fs from 'fs';
import { PrismaClient } from '@prisma/client'


/**
 * TODO: add multiple File upload support
 * */
export default defineEventHandler(async (event) => {
    const prisma =  new PrismaClient();

    const songLocation: string = `src/public/collection/${event.context.file.filename}`;

    const metaData = await parseBuffer(event.context.file.data, event.context.file.type);

    fs.writeFile(songLocation, event.context.file.data, (err) => { if (err) throw new Error(err.message) });

    const track = createTrackDatabaseEntriesContent(
        await parseBuffer(event.context.file.data, event.context.file.type),
        songLocation
    );

    await prisma.track.create({ data: track });

    let albumExists = Boolean(prisma.album.findFirst({where: { name: metaData.common.album }}));
    if (albumExists) await prisma.album.update({where: {name: metaData.common.album}, data: createAlbumDatabaseEntriesContent(metaData)})

    return { data: track }
});

