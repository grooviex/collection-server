import type {H3Event, MultiPartData} from "h3";

import {PrismaClient} from '@prisma/client'
import fs from "fs";

export default defineEventHandler(async (event: H3Event) => {
    if (event.method === "GET") {
        const query = getQuery(event);
        let takeAmount: string|undefined = query["take"]?.toString();
        let skipAmount: string|undefined = query["take"]?.toString();

        if (takeAmount) {
            if (isNumber(takeAmount)) event.context.take = parseInt(takeAmount);
        }
        if (skipAmount) {
            if (isNumber(skipAmount)) event.context.skip = parseInt(skipAmount);
        }



    }
});

function isNumber(value: string|undefined): boolean {
    let number = parseInt(value || "undefined");
    return !isNaN(number);
}
