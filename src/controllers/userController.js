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
        if (!user) {
            // 로그인 실패 (아이디/비번 불일치 등)
            return res
                .status(401)
                .json({ error: 'Not matched email or password' });
        }

        req.session.user = {
            id: user._id,
            email: user.email,
            name: user.name,
        };

        console.log(user);
        res.redirect('/');
        res.status(200).json({
            message: 'login success',
            user: req.session.user,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error login user' });
        console.error(err);
    }
};

exports.logout = async (res, req) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .send({ error: 'Error occurred during logout' });
        }
        res.redirect('/login');
    });
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
