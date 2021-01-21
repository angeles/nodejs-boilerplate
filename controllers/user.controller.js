const user = require('../models/user');
const dbcontroller = require('./dbcontroller');
const utils = require('..//utils/utils');

/**
 * Creates a user.
 */
module.exports.createUser = async (req, res) => {
  console.log("create or retrieve user "+req.body.user);
  try {    
      if( !req.body.user || req.body.user == '' || !req.body.password || req.body.password == '') //TODO check invalid characters!!
        res.status(400).json({message:"invalid parameters"});     

      dbcontroller.adduser(req.body.user, req.body.password, (data) => { 
        user.id = data;
          res.status(200).json(user);
        }, (err) => {
          res.status(500).json({"error":err});
       });         
    } catch (error) {
      res.status(500).json({"error creating user ":error});      
    }
 };

