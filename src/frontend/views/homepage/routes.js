const path = require("path");
const router = require('express').Router();

/**
 * GET: Users Profile
 * Restricted to the user themselves
 */
router.get('/', (req, res) => {
    res.render('homepage/index');
})

module.exports = router;
