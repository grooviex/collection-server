import {parseBuffer} from 'music-metadata';

import fs from 'fs';
import { PrismaClient } from '@prisma/client'
import {createTrack} from "~/server/utils/trackEntriesHandler";


export default defineEventHandler(async (event) => {
    /* TODO: add multiple File upload support */
    let track = await createTrack(event.context.file);
    return { data: track }
});

