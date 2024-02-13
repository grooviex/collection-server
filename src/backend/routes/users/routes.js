const router = require('express').Router();

const userController = require("./controllers/userController");

/**
 * GET: Users Profile
 * Restricted to the user themselves
 */
router.get('/', (req, res) => {

})

/**
 * PATCH: Update a Users Profile
 * Restricted to User ++ Admins
 */
router.post('/:userId', (req, res) => {

})

/**
 * GET: Get all users
 */
router.get('/listAll', userController.getAllUsers)

/**
 * PATCH: Update a user's role
 * Restricted to Admins
 */
router.patch('/change-roll/:userId', (req, res) => {

})

module.exports = router;
