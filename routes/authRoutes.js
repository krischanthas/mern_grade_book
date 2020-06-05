const router = require('express').Router();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateRegistration, validateLogin } = require('../util/validation');

/**
 * Register user 
 */
router.post('/register', async (req, res) => {
    // validate incoming data
    const { error } = validateRegistration(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // check if user exists
    const emailExists = await UserModel.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const userToSave = await user.save();
        res.status(201).send(userToSave);
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * Login 
 */
router.post('/login', async (req, res) => {
    // validate incoming data
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(err.details[0].message)

    // check if email exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does not exists');

    // verify password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');


    // create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_TOKEN);
    res.header('auth-token', token).send(token);

})


module.exports = router;