const express = require('express');
const User = require('../models/users');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup', {
        title: '회원가입', // 페이지 제목
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: '로그인',
    });
});

router.post('/login', userController.login);

router.route('/').get(userController.getAllUsers).post(userController.signup);

router.get('/:id', userController.getUser);

module.exports = router;
