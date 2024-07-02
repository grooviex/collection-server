/**
 * gets a specific artist from the collection
 * */
export default defineEventHandler(async (event) => {
    const artistId = getRouterParam(event, 'id');

    return {
        id: `${artistId}`,
        name: ``,
        albums: {
            test: 'test'
        },
    }
});