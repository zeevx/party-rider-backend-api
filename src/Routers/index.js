module.exports = (app) => {

    /**
     * Authentication Routes
     */
    require('./Authentication')(app);

    /**
     * User Routes
     */
    require('./User')(app);
};