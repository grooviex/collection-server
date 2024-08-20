import type {H3Event, MultiPartData} from "h3";

import {PrismaClient} from '@prisma/client'
import fs from "fs";


/* TODO: not smart in every PUT query, needs another way of checking!
*        add Support for multi upload */
export default defineEventHandler(async (event: H3Event) => {
    if (event.method === "PUT") {
        /* TODO: Find a better way for checking a call! */
        if (!['/api/v2/collection/tracks/'].includes(getRequestURL(event).pathname)) return;

        const prisma = new PrismaClient();
        const multiPartData: MultiPartData[] | undefined = await readMultipartFormData(event);
        const songFile: MultiPartData | undefined = multiPartData?.find(Boolean);
        console.log(songFile)
        if (songFile) {
            const songLocation: string = `src/public/collection/${songFile.filename}`;

            if (fs.existsSync(songLocation)) throw new Error("This file already exists locally! Aborting.");

            let formats: String[] = ["audio/ogg", "audio/flac", "audio/wav", "audio/mpeg"];
            formats.some((value, idx, array) => {
               if (songFile.type === value) return;
               if (idx === array.length - 1) throw new Error("The added file type is not supported! Aborting.");
            });

            let result = await prisma.track.findFirst({ where: { href: songLocation } });
            if (result) throw new Error("Song Already Exist in Database! Aborting.");

            event.context.file = songFile;
        } else throw new Error("No file was added to the request! Aborting.");
    }
});