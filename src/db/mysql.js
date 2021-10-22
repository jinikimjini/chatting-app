/*var crypto = require('crypto');
var salt = '';
var pwd = '';
crypto.randomBytes(64, (err, buf) =>{
    if(err) throw err;
    salt = buf.toString('hex');
});
crypto.pbkdf2('password', salt, 100000, 64, 'sha512', (err, derivedKey)=>{
 if(err) throw err;
 pwd = derivedKey.toString('hex');   
});*/

var dbConfig = {
    host :"localhost",
    user : "root",
    password : "1234",
    database : "genie"
};

module.exports = dbConfig;