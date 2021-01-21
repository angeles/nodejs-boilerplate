const login = require('../models/login');
const dbcontroller = require('./dbcontroller');
const jwt       = require('jsonwebtoken');
const utils = require('..//utils/utils');


const jwtopts = {};
//jwtopts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtopts.secretkey = "asappschallengsecretkey2";
jwtopts.algorithm = "HS256";
 
/** Login allows the user to authenticate with credentials and get a token to use on secured endpoints. */
module.exports.login = (req, res) => {    
try {  
    if( !req.body.user || req.body.user == '' || !req.body.password || req.body.password == '') //TODO check invalid characters!!
      res.status(400).json({message:"invalid parameters"});     

    dbcontroller.getuser(req.body.user, (user) => {
      if(user.id == 0){
        res.status(400).json({message:"user doesn't exist"});
        return;
      }
      if(user.password == req.body.password) { //I assume now password without encryption. It is easy to change adding a lib to do that.      
        var payload = {id: user.id, username: user.user, iat: Date.now() + parseInt(1000*60*60)}; //1 hour in milliseconds
        var token = jwt.sign(JSON.stringify(payload), jwtopts.secretkey, {algorithm: jwtopts.algorithm});
        login.id = user.id;
        login.token = token;
        res.status(200).json(login);
        }
        else {
          res.status(401).json({message:"passwords did not match"});
        }
      }, (err) => {
          res.status(500).json({message: err});
      });  
  } catch (error) {
    res.status(500).json({message:err});    
  }
};

module.exports.verifyAccessToken = (req, res, success) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token, jwtopts.secretkey,  {algorithms: [jwtopts.algorithm]}, function(err, decoded) {

        if(err){
          console.log("invalid token");
          res.status(403).json({"invalid token":err});
          return;
        }
        if (Date.now() >= parseInt(decoded.iat)) {
          console.log("token expired");
          res.status(403).json({message:"token expired"}); //TODO manage refresh token?
          return;
        }
        let usr = decoded.username;
        dbcontroller.getuser(usr, (user) => {
          if(user.id == 0){
            console.log("invalid user token");
            res.status(401).json({message:"invalid user token"});
          }
          else {
            console.log("verify token ok.");
            success(req, res);
          }
          }, (errg) => {
            console.log("error retrieving user token");
            res.status(500).json({message:"error retrieving user token "+ errg});
          });
      });    
    } else {    
      console.log("no bearerheader");
      res.sendStatus(403);// Forbidden
    }    
  } catch (error) {
    res.status(500).json({message:"error verifying token"+ error});    
  }  
}

module.exports.secureTest = async (req, res) => {
  console.log("secureTest");
  this.verifyAccessToken(req,res, function() {
    res.status(200).json({message: "secure test ok"});
  });
};
