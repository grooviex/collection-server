module.exports = {
    port: process.env.PORT,
    roles: {
        USER: 'user',
        ADMIN: 'admin'
    },
    jwtSecret: 'db80ed45894fc018c1f5db577887b1c309e0fa0459f655f785d45385750f96c9',
    jwtExpirationsInSeconds: 60 * 60,
}