const UserModel = require("../models/users.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

module.exports = {
    check: (req, res, next) => {
        if (req.session.logged_in) return res.status(500).json({
            status: false,
            message: 'go find somewhere else where you can double login >:('
        });

        return next();
    },

    LoggedInFrontend: (req, res, next) => {
        /* TODO: deactivated for debugging, later activate! */
/*        if (req.session.logged_in) return next();
        else return res.render('authorization/index');*/

        next();
    }
}