const { successResponse, errorResponse } = require("../../Utils/response");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../Config/jwt.config');
const db = require('../../Models');
const User = db.user;
const jsonwebtoken = require('jsonwebtoken');

exports.loginController = async(req, res) => {

    const { email, password } = req.body;
    try {

        const token = await loginService(email, password);

        successResponse(res, 200, 'User login successfully', { token })

    } catch (error) {

        errorResponse(res, 422, error, null)
    }

};

exports.registerController = async(req, res) => {

    const { first_name, last_name, email, phone, password } = req.body;

    try {

        const user = await registerService(first_name, last_name, phone, email, password);

        successResponse(res, 200, 'User registration successfully', user)

    } catch (error) {

        errorResponse(res, 422, error, null);
    }

};

exports.resetController = (req, res) => {

};

exports.logoutUser = async(req, res) => {

    const id = res.locals.user.id;
    try {

        await logoutService();

        successResponse(res, 200, 'User logout successfully', null);

    } catch (error) {

        errorResponse(res, 500, error, null);

    }

};


//Services
const loginService = async(email, password) => {

    const user = await User.findOne({
        where: { email },
        select: ['first_name', 'last_name', 'email', 'password'],
    });
    if (!user) {
        throw 'Your login details is incorrect';
    }

    const passwordIsMatch = await bcryptjs.compare(password, user.password);
    if (!passwordIsMatch) {
        throw 'Details entered seems incorrect'
    }

    const token = await generateToken(user);
    if (!token) {
        throw 'Token error';
    }

    return token;
};

const generateToken = (user) => new Promise((resolve, reject) => {
    const time = new Date().getTime();
    const expireTime = Math.floor((time + Number(jwtConfig.jwtExpireTime)) * 1000);
    try {
        jwt.sign({
                email: user.email
            },
            jwtConfig.jwtSecret, {
                algorithm: 'HS256',
                expiresIn: expireTime
            },
            (error, token) => {
                if (error) {
                    reject(error)
                }
                resolve(token)
            });

    } catch (e) {
        reject(e)
    }

});


const registerService = async(first_name, last_name, phone, email, password) => {

    const hash = await hashPassword(password);

    const data = {
        first_name,
        last_name,
        phone,
        email,
        password: hash
    }

    const user = await User.create(data);

    if (!user) {
        throw 'User registration error'
    }

    return user;
};

const hashPassword = async(password) => {
    try {
        return bcryptjs.hashSync(password, 10);
    } catch (error) {
        throw error;
    }
};

const logoutService = async() => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            //Do Logic
            throw 'Not Avaialable Now, do action from client end'
        }

        return true;

    } catch (error) {
        throw error;
    }
};