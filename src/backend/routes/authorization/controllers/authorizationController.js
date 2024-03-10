const UserModel = require("../../../common/models/users.model");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { roles } = require("../../../../config");


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
                const accessToken = jwt.sign(payload.username, user.id);
                res.status(200).json({
                    status: true,
                    result: {
                        user: user.toJSON(),
                        token: accessToken
                    },
                });
            }).catch((err) => {
                res.status(500).json({
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