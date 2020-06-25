/**
 * This is a middleware function will enforce Role Based Access Control
 */
const UserModel = require('../models/UserModel');

const verifyBasicRole = async (req, res, next) => {
    try {
        const userRole = await UserModel.findById(req.user._id);

        if (userRole.role === 'basic') {
            req.user = userRole;
            next();
        } else {
            return res.status(401).send('You have an issue with you permissions, please contact support.');
        }
    } catch (err) {
        return res.send(err);
    }


}


module.exports = verifyBasicRole;