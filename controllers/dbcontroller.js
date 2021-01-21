const config = require('../config');
const user = require('../models/user');

var database = require(config.database.database).verbose();
//TODO USE the ORM here.

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
  db.all("select rowid,user,password from USERS where user = '"+usr+"'", function (err, row){ 
    db.close();
    if(err){
      console.log("igetuser err: "+err);
      error(err);
      return;
    }
    if(row.length>0) {
      user.id =row[0].rowid;
      user.password = row[0].password;
      user.user = row[0].user;
      success(user);
    }
    else {
      user.id =0;
      user.password = '';
      user.user = usr;
      success(user);
    }
  });    
}

function insertuser (usr, pwd, success, error) {
  var db = new database.Database(config.database.base);
  db.run('insert into USERS(user, password) values(?, ?)', [usr,pwd], function(err) {
      if(null == err){ // row inserted ok
        db.close();
        success(this.lastID);
      } else {
      db.close();
      error(err);
    }
  }); 
}

module.exports.getmessages = (recipient, start, limit, succes, error) =>{
  var db = new database.Database(config.database.base);  
  //+recipient+ " and rowid >= "+ start +" limit "+limit
  var rows = [];
  succes(rows);
  /*db.all("select rowid as id,timestamp, sender, recipient, content from messages where recipient = 2", function(err,rows){
    db.close();  
    if(err == null )
        error(err);      
    if(rows == undefined )
      error("invalid results");      
    succes(rows);
  });*/
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

