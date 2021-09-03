const Joi = require("joi");
const { errorResponse } = require("../../Utils/response");
const db = require('../../Models');
const User = db.user;
exports.validateLoginFields = async(req, res, next) => {

    const { email, password } = req.body;
    const format = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    format.validateAsync({ email, password }, { stripUnknown: true }).then(() => {

        next();

    }).catch(err => {

        errorResponse(res, 500, err.details[0].message, null);

    })


}

exports.validateRegistrationFields = async(req, res, next) => {

    const {
        first_name,
        last_name,
        email,
        phone,
        password
    } = req.body;

    const format = Joi.object().keys({
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone: Joi.number().required(),
        password: Joi.string().required(),
    });

    User.count({ where: { 'email': email } })
        .then(count => {
            if (count > 0) {

                errorResponse(res, 500, 'User with email already exists', null);

            }
        });

    User.count({ where: { 'phone': phone } })
        .then(count => {
            if (count > 0) {

                errorResponse(res, 500, 'User with phone already exists', null);

            }
        });

    format.validateAsync({
        first_name,
        last_name,
        email,
        phone,
        password
    }, { stripUnknown: true }).then(async() => {

        next();

    }).catch(err => {

        errorResponse(res, 500, err.details[0].message, null);
    })

}

exports.validateUpdateFields = async(req, res, next) => {

    const {
        first_name,
        last_name
    } = req.body;

    const format = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
    });

    format.validateAsync({
        first_name,
        last_name
    }, { stripUnknown: true }).then(async() => {

        next();

    }).catch(err => {

        errorResponse(res, 500, err.details[0].message, null);

    })
}

exports.validateUpdatePasswordFields = async(req, res, next) => {
    const {
        old_password,
        new_password,
        confirm_password,
    } = req.body;

    const format = Joi.object().keys({
        old_password: Joi.string().required(),
        new_password: Joi.string().required(),
        confirm_password: Joi.string().required(),
    });

    format.validateAsync({
        old_password,
        new_password,
        confirm_password
    }, { stripUnknown: true }).then(async() => {

        next();

    }).catch(err => {
        errorResponse(res, 500, err.details[0].message, null);
    })
}