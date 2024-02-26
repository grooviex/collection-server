const UserModel = require("../../../../common/models/users.model");
const { encryptPassword } = require('jsonwebtoken');

const { roles } = require("../../../../config");

module.exports = {
    register: (req, res) => {
        const payload = req.body;

        let encryptedPassword = encryptPassword(payload.password);
        let role = payload.role;

        if (!role) {
            role = roles.USER;
        }

        UserModel.createUser(
            Object.assign(payload, {password: encryptedPassword, role})
        )
            .then((user) => {
                // Generating an AccessToken for the user, which will be
                // required in every subsequent request.
                const accessToken = generateAccessToken(payload.username, user.id);

                return res.status(200).json({
                    status: true,
                    result: {
                        user: user.toJSON(),
                        token: accessToken,
                    },
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },
}