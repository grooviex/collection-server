const UserModel = require("../../../common/models/users.model");

module.exports = {
    check: (req, res) => {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                error: {
                    message: 'Auth headers not provided in the request.'
                }
            });
        }
    }
}