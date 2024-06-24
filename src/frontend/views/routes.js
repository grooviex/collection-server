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
    async (req, res) => {

        const songs = await fetch('http://localhost:3000/api/collection/listSongs', {
            method: 'GET',
            params: {res, req}
        });

        const users = await fetch('http://localhost:3000/api/users/listAll', {
            method: 'GET',
            params: {res, req}
        });

        let listOfSongs = await songs.json();
        let listOfUsers = await users.json();
        res.render('homepage/index', {
            songs: listOfSongs.response.message,
            users: listOfUsers.response.message
        });

    });

router.get('/collection',     [
        IsAuthenticatedMiddleware.LoggedInFrontend
    ],

    async (req, res) => {

        const songs = await fetch('http://localhost:3000/api/collection/listSongs', {
            method: 'GET',
            params: {res, req}
        });

        let listOfSongs = await songs.json();
        res.render('collection/index', {
            songs: listOfSongs.response.message
        });

    }

);

router.get('/users', [
        IsAuthenticatedMiddleware.LoggedInFrontend
    ],
    async (req, res) => {
    const users = await fetch('http://localhost:3000/api/users/listAll', {
            method: 'GET',
            params: {res, req}
    });

        let listOfUsers = await users.json();
    res.render('users/index', {
            users: listOfUsers.response.message
        });

});

router.get('/logout', [
        IsAuthenticatedMiddleware.LoggedInFrontend
    ],
    (req, res) => {  });

module.exports = router;
