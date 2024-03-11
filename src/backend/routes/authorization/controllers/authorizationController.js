const UserModel = require("./../../../common/models/users.model");

const bcrypt = require('bcryptjs');

/* TODO: Look into JWT, how does the token go into the header? */
const jwt = require('jsonwebtoken');

const { roles, jwtSecret, jwtExpirationsInSeconds} = require("../../../../config");

function generateAccessToken(username, userId) {
    return jwt.sign(
        {
            userId,
            username,
        },
        jwtSecret,
        {
            expiresIn: jwtExpirationsInSeconds,
        }
    );
}

module.exports = {
    register: async (req, res) => {
        const payload = req.body;

        let role = payload.role || roles.USER;

        bcrypt.hash(payload.password, 10, (err, hash) => {
            UserModel.createUser(
                Object.assign(payload, {
                    password: hash,
                    role: role,
                    username: payload.username,
                    email: payload.email
                })
            ).then((user) => {
                const accessToken = generateAccessToken(payload.username, user.id);

                return res.status(200).json({
                    status: true,
                    result: {
                        user: user.toJSON(),
                        token: accessToken
                    },
                });
            }).catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
        });

    },
    login: async (req, res) => {
        const payload = req.body;

        res.status('');
    }
}