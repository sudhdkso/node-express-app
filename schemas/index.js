
const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const app = express()
const port = 3000

app.use(cors())

require('dotenv').config(); 

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true); // 몽고 쿼리가 콘솔에서 뜨게 한다.
    }
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(port, () => {
            console.log('Server listening on port: ',port)
        })
    })
    .catch(err => console.error('Connection error:', err))
    
};

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect(); // 연결 재시도
});


module.exports = connect;