const express = require('express');
const router = express.Router();

const authController = require("./controllers/authorizationController");

/**
 * POST: Register a new user
 */
router.post('/signup', authController.register)

/**
 * POST: Logging in
 */
router.post('/login', (req, res) => {

});

module.exports = router;