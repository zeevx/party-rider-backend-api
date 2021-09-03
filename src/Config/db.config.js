module.exports = {
    HOST: process.env.DB_HOST,
    DB: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    POOL: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};