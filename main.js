var http = require('http'); //모듈 가져오는 것, 로딩결과를 담음
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./src/lib/template.js');
var path = require('path'); //경로 보안 , 오염된 정보 들어올때
var sanitizeHtml = require('sanitize-html');//보안, 오염된 정보를 내보낼때
var mysql = require('mysql');
var db = mysql.createConnection({
    host :"localhost",
    user : "root",
    password : "1234",
    database : "genie"
  
});
db.connect();


var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;


  if (pathname === '/') {
    if (queryData.id === undefined) {

        var html = template.htmlMain( `
        <form action="/login" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" placeholder="description"></textarea></p>
        <p><input type="submit"/></p>
        </form>
        `,'');
        response.writeHead(200); //성공적으로 전송했다.
        response.end(html);
     


    } else if (pathname === '/login') {

          response.writeHead(200); //성공적으로 전송했다.
          response.end(html);

    }

  } 

   else {
    response.writeHead(404); // 페이지를 찾을 수 없다.
    response.end('Not found');
  }


});
app.listen(5000); //서버를 구동시키는 api
