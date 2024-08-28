/**
 * remove a song from the collection
 * */
export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    if (query.id) {
        return await deleteTrack(stringToNumber(query.id));
    } else throw Error('No ID given!');
});