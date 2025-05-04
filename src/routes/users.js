const express = require('express');
const User = require('../models/users');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup', {
        title: '회원가입', // 페이지 제목
    });
});

router.route('/').get(userController.getAllUsers).post(userController.signup);

router.get('/:id', userController.getUser);

module.exports = router;
