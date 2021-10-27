var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();
var ejs = require('ejs');
var crypto = require('crypto');
var bodyParser = require('body-parser'); //post request data의 body로 부터 파라미터를 편리하게 추출
var path = require('path'); //경로 보안 , 오염된 정보 들어올때
var sanitizeHtml = require('sanitize-html'); //보안, 오염된 정보를 내보낼때
var mysql = require('mysql');
var dbConfig = require('./src/db/mysql.js');
var db = {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database

};

var conn = mysql.createConnection(db);
conn.connect();

app.set('view engine', 'ejs'); //화면 engine을 ejs로 설정 (기본엔진)
app.set('views', './views'); //view 경로 설정
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: '!@#$%^&*', //세션 암호화
    store: new MySQLStore(db), //세션데이터를 저장하는 곳
    resave: false, //세션을 항상 저장할지 여부를 정하는값(false권장)
    saveUninitialized: false //초기화되지않은채 스토어에 저장 true
}));
app.use(express.static('./src')); //express 에서 정적파일을 컨트롤 , 경로설정

app.get('/', function (req, res) {
    if (req.session.memId===undefined) {
        res.render('login') //로그인세션이 안되어있으면 로그인페이지 이동

    } else {
        res.redirect('/friendsList'); //

    }

});


app.get('/friendsList', function (req, res) {
    if (!req.session.memId) {
        res.redirect('/login');
    } else {
        var memId = req.session.memId;
        var memName = req.session.memName;
        var sql = 'SELECT  m.memName, m.memNum, profileImg, profileContent FROM member as m left outer join friends as f on f.memNum = ' +
                'm.memNum WHERE f.memId=?';
        conn.query(sql, memId, function (err, results) {
            if (err) {
                console.log(err);
            } else {  
               
                     
               res.render('friendsList', {data: results,
            memName: memName});
            }

        });
    }
});

app.get('/logout', function (req, res) {
    req
        .session
        .destroy(function (err) { //세션 삭제
            res.redirect('/');
        });
});

app.post('/login', function (req, res) {
    var id = req.body.memId;
    var pwd = req.body.memPwd;
    var sql = 'SELECT * FROM member WHERE memId=?';
    conn.query(sql, [id], function (err, results) {
        if (err) {
            console.log(err);
        }
        if (!results[0]) {
            return res.send('please check your id.');
        }

        var member = results[0];
        console.log(member);
        if (pwd === member.memPwd) {
            req.session.memNum = results[0].memNum; //세션에 로그인 정보 입력
            req.session.memId = results[0].memId;  
            req.session.memPwd = results[0].memPwd;
            req.session.memName = results[0].memName; 
            req.session.memPhone = results[0].memPhone; 
            req.session.save(function(){   //세션에 로그인 정보 저장
                res.redirect('/friendsList');
            })
            
        } else {
            return res.send('please check your password')
        }

    })
})

app.listen(5000); //서버를 구동시키는 api