const UserModel = require("./../../../common/models/users.model");

const bcrypt = require('bcryptjs');
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
                const accessToken = jwt.sign({ userId: user.id, username: user.username}, jwtSecret,
                    {
                        expiresIn: jwtExpirationsInSeconds,
                    });

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
    login: (req, res) => {
        const { username, password } = req.body;

        /* check if user exists */
        UserModel.findUser({ username }).then((user) => {
            if (!user) {
                return res.status(400).json({
                    status: false,
                    error: {
                        message: `Could not find any user with username: \`${username}\`.`,
                    },
                });
            }

            bcrypt.compare(password, user.password, (err, responded) => {
                if (responded) {
                    const accessToken = jwt.sign({ userId: user.id, username: user.username}, jwtSecret,
                        {
                            expiresIn: jwtExpirationsInSeconds,
                        });

                    if (!res.cookies) res.cookies = [];
                    if (res.cookies['tokenKey']) {
                        return res.status(400).json({
                            status: false,
                            error: {
                                message: 'You are already signed in. You need to log out first!'
                            }
                        });
                    }

                    return res.status(200).json({
                        status: true,
                        data: {
                            user: user.toJSON(),
                            token: accessToken,
                        },
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        error: {
                            message: `Provided username and password did not match.`,
                            error: err,
                        },
                    });
                }
            })
        }).catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }
}