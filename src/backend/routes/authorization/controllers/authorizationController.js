const UserModel = require("../../../../common/models/users.model");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { roles, jwtSecret, jwtExpirationsInSeconds} = require("../../../../config");

module.exports = {
    register: async (req, res) => {
        const payload = req.body;

        let role = payload.role || roles.USER;

        bcrypt.hash(payload.password, 10, async (err, hash) => {
             UserModel.createUser(
                Object.assign(payload, {
                    password: hash,
                    role: role,
                    username: payload.username,
                    email: payload.email
                })
            ).then((user) => {

                req.session.save(() => {
                    req.session.logged_in = true;
                    req.session.user = {
                        id: user['id'],
                        username: payload.username,
                        email: payload.email,
                        role: role
                    };

                    res.status(200).json({
                        status: true,
                        result: {
                            user: user.toJSON(),
                            message: 'You have an Account! Yippie :3'
                        },
                    });
                })

            }).catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;

        /* check if user exists */
        UserModel.findUser({ email }).then((user) => {
            if (!user) {
                return res.status(400).json({
                    status: false,
                    error: {
                        message: `Could not find any user with email: \`${email}\`.`,
                    },
                });
            }

            bcrypt.compare(password, user.password, async (err, responded) => {
                if (!req.session.logged_in) {
                    if (responded) {
                        await req.session.save(async () => {
                            req.session.logged_in = true;
                            req.session.user = {
                                id: user['id'],
                                username: user['username'],
                                email: user['email'],
                                role: user['role'],
                            };

                            return res.status(200).json({
                                status: true,
                                result: {
                                    user: user.toJSON(),
                                    message: 'Logged In!'
                                },
                            });
                        });
                        return;
                    }
                }

                return await res.status(400).json({
                    status: false,
                    error: {
                        message: `There is something wrong! no no :(`,
                        error: err,
                    },
                });

            })

        }).catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },

    logout: (req, res) => {
        if (!req.session.logged_in) return res.status(500).json({
            status: false,
            error: {
                message: 'You dumb? You not even logged in :('
            }
        });

        req.session.destroy();
        return res.status(200).json({
            status: false,
            error: {
                message: 'You are logged out!'
            }
        })
    }
}