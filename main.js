var express = require('express');
var app = express();
var ejs = require('ejs');
var crypto = require('crypto');
var bodyParser = require('body-parser'); //post request data의 body로 부터 파라미터를 편리하게 추출
var path = require('path'); //경로 보안 , 오염된 정보 들어올때
var sanitizeHtml = require('sanitize-html');//보안, 오염된 정보를 내보낼때
var mysql = require('mysql');
var dbConfig = require('./src/db/mysql.js');
const { user } = require('./src/db/mysql.js');
var db = {
    host : dbConfig.host,
    user : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.database
  
};


var conn = mysql.createConnection(db);
conn.connect();


app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'ejs');//화면 engine을 ejs로 설정 (기본엔진)
app.set('views','./views'); //view 경로 설정

app.get('/', function (req, res) {
    res.render('login');
});

app.post('/login', function(req, res){
  var id= req.body.memId;
  var pwd = req.body.memPwd;
  var sql = 'SELECT * FROM member WHERE memId=?';
  conn.query(sql, [id], function(err, results){
    if(err){
      console.log(err);
    }
    if(!results[0]){
      return res.send('please check your id.');
    }
    
    var member = results[0];
      if(pwd === member.memPwd){
        return res.send('login success');
      } else {
        return res.send('please check your password')
      }

  })
})

app.listen(5000); //서버를 구동시키는 api
