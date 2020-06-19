const router = require('express').Router();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateRegistration, validateLogin } = require('../util/validation');
const verifyToken = require('../util/verifyToken');
/**
 * Register user 
 */
router.post('/register', async (req, res) => {
    // validate incoming data
    const { error } = validateRegistration(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })

    // check if user exists
    const emailExists = await UserModel.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json({ message: 'Email already exists' });

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });

    try {
        await user.save();
        res.status(201).send('User successfully registered');
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});

/**
 * Login 
 */
router.post('/login', async (req, res) => {
    // validate incoming data
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })

    // check if email exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Email does not exists' });

    // verify password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    // create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_TOKEN);
    res.header('Authorization', token).json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });

})

/**
 *  This route is used to get current logged in user's information
 */
router.get('/user', verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user);
        if (!user) throw Error('User Does not exist');
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (e) {
        console.error(e);
    }
});


module.exports = router;