const express = require('express');
const router = express.Router();


const {request, response} = require("express");

/* Middleware Imports */
const IsAuthenticatedMiddleware = require("../../common/middlewares/IsAuthenticatedMiddleware");

/* Controller Imports */
const authorizationController = require("./controllers/authorizationController");

// noinspection JSCheckFunctionSignatures
/**
 * POST: Register a new user
 */
router.post(
    "/signup",
    authorizationController.register
);

/**
 * POST: Logging in
 */
router.post('/login', (req, res) => {

});

module.exports = router;