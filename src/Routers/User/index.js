const express = require('express');
const router = express.Router();
const user = require('../../Controllers/User');
const checkAuthentication = require('../../Middlewares/Authentication/checkAuthentication');
const { validateUpdateFields } = require('../../Middlewares/Validations/authValidation');

module.exports = app => {

    /**
     * Get User
     */
    router.get('/', checkAuthentication, user.getUser);

    /**
     * Update User
     */
    router.patch('/update', [checkAuthentication, validateUpdateFields], user.updateUser);



    app.use('/api/v1/user', router);
};