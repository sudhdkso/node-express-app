const express = require('express')
const User = require('../schemas/users')

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup', {
      title: '회원가입'  // 페이지 제목
    })
})

router.route('/')
    .get(async(req, res, next) => {
        try {
            const users = await User.find({})
            res.status(200).json(users)
        } catch (err) {
            console.error(err)
            next(err)
        }
    })
    .post(async (req, res, next) => {
        try {
            const data = req.body
            console.log(req.body)
            const user = await User.create({
                email : data.email,
                password : data.password,
                name : data.name,
                age: data.age,
                phoneNumber: data.phoneNumber
            })
            console.log(user)
            res.status(201).json(user)
        } catch (err){
            console.error(err)
            next(err)
        }
    })

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.find({id: req.params.id})
        res.status(200).json(user)
    } catch(err){
        console.error(err)
        next(err)
    }
})


module.exports = router;