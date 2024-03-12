const express = require('express');
const router = express.Router();
const {request, response} = require("express");

/* Controller Imports */
const authorizationController = require("./controllers/authorizationController");

/* Middleware Imports */
const SchemaValidationMiddleware = require("../../common/middlewares/SchemaValidationMiddleware");
const IsAuthenticatedMiddleware = require("../../common/middlewares/IsAuthenticatedMiddleware");

/* JSON schemas for Validation */
const {register, login} = require("./schemas/authorizationPayload");

/**
 * POST: Register a new user
 */
router.post(
    "/signup",
    [SchemaValidationMiddleware.verify(register)],
    authorizationController.register
);

/**
 * POST: Logging in
 */
router.post(
    '/login',
    [SchemaValidationMiddleware.verify(login)],
    authorizationController.login
);

router.post(
    '/logout',
    [IsAuthenticatedMiddleware.check],
    authorizationController.logout
)

module.exports = router;