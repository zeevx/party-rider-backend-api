module.exports = {
    jwtSecret: process.env.SECRET_KEY,
    jwtExpireTime: process.env.TOKEN_TIME,
    jwtIssuer: process.env.TOKEN_ISSUER
};