const express = require('express');
const router = express.Router();

const userController = require("./controllers/userController");

/**
 * GET: Users Profile
 * Restricted to the user themselves
 */
router.post('/', (req, res) => {

})

/**
 * PATCH: Update a Users Profile
 * Restricted to User ++ Admins
 */
router.patch('/:userId', (req, res) => {

})

/**
 * GET: Get all users
 */
router.get('/all', userController.getAllUsers)

/**
 * PATCH: Update a user's role
 * Restricted to Admins
 */
router.patch('/change-roll/:userId', (req, res) => {

})

module.exports = router;
