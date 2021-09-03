const db = require('../../Models');
const User = db.user;
const { successResponse, errorResponse } = require('../../Utils/response');
exports.getUser = async(req, res) => {
    const id = res.locals.user.id;
    try {

        const user = await User.findByPk(id);

        successResponse(res, 200, 'User information fetched successfully', user);

    } catch (error) {

        errorResponse(res, 500, error, null);

    }

};

exports.updateUser = async(req, res) => {

    const id = res.locals.user.id;

    const { first_name, last_name } = req.body;

    try {

        const update = await User.update({
            first_name,
            last_name
        }, {
            where: { id }
        });

        if (!update) {

            errorResponse(res, 500, 'User information not updated', null);

        }

        const user = await User.findByPk(id);

        successResponse(res, 200, 'User information updated successfully', user);

    } catch (error) {

        errorResponse(res, 500, error, null);

    }

};