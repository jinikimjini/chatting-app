var mysql = require('mysql');

var connection = mysql.createConncetion({
    host :"localhost",
    user : "root",
    password : "1234",
    database : "genie"
});

connection.connect("select * from genie", function (error, results){
    if(error){
        console.log(error);

    }
    console.log(results);
});

connection.end();