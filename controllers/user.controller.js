const dbcontroller = require('./dbcontroller');

/**
 * Creates a user.
 */
module.exports.createUser = async (req, res) => {
    //TODO add password encryption
  console.log("createUser");
  dbcontroller.adduser(req.body.user, req.body.password, (data) => { 
      res.status(200).json({"id":data});
    }, (err) => {
      res.status(500).json({"error":err});
   });  
 };


/*
function encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, password)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  var decipher = crypto.createDecipheriv(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}
*/