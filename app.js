const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const app = express()
const port = 3000
const router = express.Router();

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

//ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// DB연결 모듈
const connect = require('./src/models');

// 몽고 디비 연결
connect();

const routes = require('./src/routes');

app.use('/users', routes.userRoutes);

app.listen(port, () => {
    console.log('Server listening on port: ',port)
})
