const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {
        title: '로그인',
    });
});

router.post('/', userController.login);

module.exports = router;
