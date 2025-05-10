const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup', {
        title: '회원가입', // 페이지 제목
    });
});

router.route('/').post(userController.signup);

module.exports = router;
