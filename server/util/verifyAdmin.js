/**
 * This is a middleware function will enforce Role Based Access Control
 */
const UserModel = require('../models/UserModel');

const verifyAdminRole = async (req, res, next) => {
    try {
        const userRole = await UserModel.findById(req.user._id);

        if (userRole.role === 'admin') {
            req.user.role = userRole;
            next();
        } else {
            return res.status(401).send('Admin access only');
        }
    } catch (err) {
        return res.send(err);
    }


}


module.exports = verifyAdminRole;