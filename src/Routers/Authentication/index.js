const express = require('express');
const router = express.Router();
const auth = require('../../Controllers/Authentication');
const checkAuthentication = require('../../Middlewares/Authentication/checkAuthentication');
const { validateLoginFields, validateRegistrationFields } = require('../../Middlewares/Validations/authValidation');

module.exports = app => {

    /**
     * Login Routes
     */
    router.post('/login', validateLoginFields, auth.loginController);

    /**
     * Register Route
     */
    router.post('/register', validateRegistrationFields, auth.registerController);

    /**
     * Logout User
     */
    router.post('/logout', checkAuthentication, auth.logoutUser);

    /**
     * Forgot Password Route
     */
    router.post('/reset', auth.resetController);


    app.use('/api/v1/auth', router);
};