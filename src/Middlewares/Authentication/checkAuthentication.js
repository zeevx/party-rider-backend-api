const jsonwebtoken = require('jsonwebtoken');
const jwtConfig = require('../../Config/jwt.config');
const { errorResponse, successResponse } = require('../../Utils/response');
const db = require('../../Models');
const User = db.user;

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
        jsonwebtoken.verify(token, jwtConfig.jwtSecret, async(error, decoded) => {
            if (error) {
                successResponse(res, 422, 'User not authorized', null)
            } else {
                const email = decoded.email;
                const user = await User.findOne({ email });

                if (!user) {

                    errorResponse(res, 500, 'Who are you?', null)
                }

                res.locals.user = user;

                next();
            }
        });
    } else {

        errorResponse(res, 422, 'Please log in first', null);
    }
}