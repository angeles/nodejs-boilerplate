const config = require('../config');
const dbuser = require('../models/dbuser');

//TODO USE the ORM here.
var database = require(config.database.database).verbose();


//TODO: move crypto routines to another controller or utils file.
const crypto  = require('crypto');
const algorithm = 'aes-256-cbc'; 
const key = "estoesunapruenadestoesunapruenad"; 
const iv = "estoesunapruenad" ; 


module.exports.adduser = async (usr, pwd, success, error) => {
  igetuser(usr,
    function(r) {
      if(r.id == 0){
        insertuser(usr, pwd,
        function(s) { success(s) },
        function(e){ error(e) });
      }
      else { 
        success(r.id)}},
    function(r) {
      error(r);
    });
};

module.exports.getuser = async (usr, success, error) => {
  igetuser(usr,
    function(r) {
      success(r)},
    function(err) {
      error(err);
    });
};

module.exports.isuserid = async (usrid, success, error) => {
  var db = new database.Database(config.database.base);
  db.all("select 1 from USERS where rowid = '"+usrid+"'", function (err, row){ 
    db.close();
    if(err){     
      error(err);
      return;
    }
    if(row.length>0) {
      success(1);
    }
    else {
      success(0);
    }
  });    
};

function igetuser (usr, success, error) {
  var db = new database.Database(config.database.base);
  db.all("select rowid,user,password from users where user = ?;",[usr], function (err, row){ 
    db.close();
    if(err){
      console.log("igetuser err: "+err);
      error(err);
      return;
    }
    if(row.length>0) {
      dbuser.id =row[0].rowid;
      dbuser.password = decrypt(row[0].password);
      dbuser.user = row[0].user;
      success(dbuser);
    }
    else {
      dbuser.id =0;
      dbuser.password = '';
      dbuser.user = usr;
      success(dbuser);
    }
  });    
}

function insertuser (usr, pwd, success, error) {
  let cryptedpwd = encrypt(pwd);
  var db = new database.Database(config.database.base);
  db.run('insert into users(user, password) values(?, ?)', [usr,cryptedpwd], function(err) {
      if(null == err){ // row inserted ok
        db.close();
        success(this.lastID);
      } else {
      db.close();
      error(err);
    }
  }); 
}

module.exports.getmessages = (recipient, start, limit, success) =>{
  var db = new database.Database(config.database.base);  
  let query = "select rowid as id,timestamp, sender, recipient, content from messages where recipient = "+recipient +"  and rowid >= "+ start +" limit "+limit+ ";";
  db.all(query, function(err,rows){
    db.close();     
    success(err,rows);
  });
}

  
module.exports.insertmessage = (sender, recipient, content, success, error) => {
  if(sender && recipient && content){           
    var now = Date.now();
    var contentjson = JSON.stringify(content);
    var db = new database.Database(config.database.base);
    db.run('insert into MESSAGES(sender, recipient, type, content, timestamp) values(?, ?, ?, ?, ?)', [sender, recipient, content.type, contentjson, now ], function(err) {
        if(null == err){ // row inserted ok
          db.close();
          success(this.lastID, now);//TODO check if it is the same timestamp or the after insert time.
        } else {
        db.close();
        error(err);
      }
    });
  }
};

function encrypt(text) { 
  let cipher = crypto.createCipheriv( algorithm, Buffer.from(key), iv); 
  let encrypted = cipher.update(text);    
  encrypted = Buffer.concat([encrypted, cipher.final()]); 
  return encrypted.toString('hex'); 
 } 

 function decrypt(text){
   var decipher = crypto.createDecipheriv( algorithm, Buffer.from(key), iv); 
   var dec = decipher.update(text, 'hex', 'utf8');
   dec += decipher.final('utf8');
   return dec;
 }