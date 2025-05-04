const User = require('../models/users');
const userService = require('../services/userService');

exports.signup = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error creating user' });
        console.error(err);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await userService.login(req.body);
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error login user' });
        console.error(err);
    }
};

exports.getUser = async (res, req) => {
    try {
        const user = await User.find({ id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user data' });
        console.error(err);
        next(err);
    }
};

exports.getAllUsers = async (res, req) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
