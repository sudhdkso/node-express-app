const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 3000;

const routes = require('./src/routes');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// DB연결 모듈
const connect = require('./src/models');

// 몽고 디비 연결
connect();

// 세션 설정
app.use(
    session({
        secret: 'secretkey',
        resave: false, //세션을 변경하지 않는 한 매 요청마다 다시 저장하지 않음
        saveUninitialized: false, //로그인 하지 않아도 세션 생성 가능?
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: false, // HTTPS 환경에서만 쿠키 쓸건지
            httpOnly: true,
        },
    })
);

// 예외 경로(로그인, 회원가입 등)
const openPaths = ['/', '/login', '/signup'];

// 전역 미들웨어로 인증 검사
app.use((req, res, next) => {
    if (openPaths.includes(req.path)) {
        return next();
    }
    if (req.session && req.session.user) {
        return next();
    }
    res.status(401).send('로그인이 필요합니다');
});

// 라우터 설정
app.use('/users', routes.userRoutes);
app.use('/login', routes.loginRoutes);
app.use('/logout', routes.logoutRoutes);
app.use('/signup', routes.signupRoutes);

app.get('/', (req, res) => {
    res.render('home', { title: '홈', user: req.session.user });
});

app.listen(port, () => {
    console.log('Server listening on port: ', port);
});
