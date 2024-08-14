import type {H3Event} from "h3";

export default defineEventHandler(async (event: H3Event) => {
    if (event.method === "GET") {
        const query = getQuery(event);
        let takeAmount: string|undefined = query["take"]?.toString();
        let skipAmount: string|undefined = query["skip"]?.toString();

        if (takeAmount && isNumber(takeAmount)) event.context.take = parseInt(takeAmount);
        if (skipAmount && isNumber(skipAmount)) event.context.skip = parseInt(skipAmount);

    }
});

function isNumber(value: string|undefined): boolean {
    let number = parseInt(value || "undefined");
    return !isNaN(number);
}
