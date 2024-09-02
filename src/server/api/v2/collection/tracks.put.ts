export default defineEventHandler(async (event) => {
    /* TODO: add multiple File upload support */
    let track = await createTrack(event.context.file);
    return { data: track }
});

