const {roles} = require("../../../../config");
module.exports = {
    login: {
        type: 'object',
        properties: {
            email: {
                type: 'string'
            },
            password: {
                type: 'string'
            }
        },
        required: [
            'email',
            'password'
        ]
    },
    register: {
        type: 'object',
        properties: {
            username: {
                type: 'string'
            },
            email: {
                type: 'string',
                pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' // Needs to be: [TEXT]@[TEXT].[TEXT]
            },
            password: {
                type: 'string'
            },
            role: {
                type: 'string',
                enum: Object.values(roles)
            }
        },
        required: [
            'username',
            'email',
            'password'
            ]
    }
}