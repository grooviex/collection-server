/**
 * gets a specific song from the collection
 * */
export default defineEventHandler(async (event) => {
    const songId = getRouterParam(event, 'id');

    return {
        id: `${songId}`,
        albums: {
            test: 'test'
        },
    }
});