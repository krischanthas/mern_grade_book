/**
 * This is a middleware function to protect routes
 */
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Unauthorized, please log in to continue.');

    try {
        // if verified an object is returned containing 
        //the jwt payload (which includes _id) 
        const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = verified;
        next();
    } catch (err){
        res.status(400).send('Invalid token');
    }
}

module.exports = verifyToken;