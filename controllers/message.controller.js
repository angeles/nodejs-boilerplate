var message = require('../models/message');
const dbcontroller = require('./dbcontroller');
const authController = require('./auth.controller');


/**
 * Send a message from one user to another. We support three types of messages `text`, `image` and `video` 
 */
module.exports.send = async (req, res) => {
  authController.verifyAccessToken(req, res, function() {
    console.log("send message");
    message = req.body;  
    
    validateMessageContentSchema(message.content, () => {
    dbcontroller.insertmessage(message.sender, message.recipient, message.content, (msgid,time) => {
      console.log("message sent saved!");
      res.status(200).json({"id":msgid, "timestamp":time});
    }, (error) => {
      res.status(500).json({message: "error saving message - "+error});
    } );}, (error) => {
      res.status(401).json({meesage: "invalid message schema" });
    });
  });
};


/**
 * Fetch all existing messages to a given recipient, within a range of message IDs.
 */
module.exports.get = async (req, res) => {
  console.log("get messages");
  authController.verifyAccessToken(req, res, function() {
    
    dbcontroller.getmessages(req.query.recipient, req.query.start, req.limit, (msglist) => {      
      // var objs = [];
      // for (var i = 0;i < msglist.length; i++) {
      //     objs.push(msglist[i]);
      // }      
      console.log("---------------- get message");
      console.log("msglist: "+msglist);
      res.status(200).json({messages:JSON.stringify(msglist)});
    }, (error) => {
      res.status(500).json({message: "error retrieving message - "+error});
    });
  });
};

function validateMessageContentSchema (content, success, error) {
  //TODO
  success();
  /*
  //TODO ver si agrego schema a validar prguntando antes por el type o directo todo...
  var jsonValidator = require('jsonschema').Validator;
  var validator = new jsonValidator();
  var messageSchema = fs.readfile("api.schemas.json");
  validator.addSchema(messageSchema, '/Message');
  validator.validate(content, function(err) {
        if(null == err){ // row inserted ok
          success();
        } else {
        error(err);
        }
      });     
  */
}


