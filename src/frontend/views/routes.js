const path = require("path");
const router = require('express').Router();

const IsAuthenticatedMiddleware = require("../../common/middlewares/IsAuthenticatedMiddleware");

/**
 * GET: Users Profile
 * Restricted to the user themselves
 */
router.get('/',
    [
    IsAuthenticatedMiddleware.LoggedInFrontend
    ],
    (req, res) => { res.render('homepage/index'); });

router.get('/collection',     [
        IsAuthenticatedMiddleware.LoggedInFrontend
    ],

    async (req, res) => {

        const songs = await fetch('http://localhost:3000/api/collection/listSongs', {
            method: 'GET',
            params: {res, req}
        });

        /*  TODO: for loop, make table. Be happy :3 */

        let listOfSongs = await songs.json();
        res.render('collection/index', {
            songs: listOfSongs.response.message
        });

    }

);

router.get('/users', [
        IsAuthenticatedMiddleware.LoggedInFrontend
    ],
    (req, res) => { res.render('users/index'); });

router.get('/logout', [
        IsAuthenticatedMiddleware.LoggedInFrontend
    ],
    (req, res) => {  });

module.exports = router;
