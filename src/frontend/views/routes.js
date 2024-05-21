const path = require("path");
const router = require('express').Router();

/**
 * GET: Users Profile
 * Restricted to the user themselves
 */
router.get('/', (req, res) => {
    res.render('homepage/index');
})

router.get('/collection', (req, res) => {
    res.render('collection/index');
})

router.get('/users', (req, res) => {
    res.render('users/index');
})

router.get('/auth', (req, res) => {
    res.render('authorization/index');
})

module.exports = router;
