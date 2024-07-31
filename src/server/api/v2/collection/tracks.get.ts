/**
 * returns all songs in the collection
 * */
export default defineEventHandler(async (event) => {

    return {
        id: `songs`,
        albums: {
            test: ';3zz'
        },
    }
});