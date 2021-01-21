var message = require('../models/message');
const dbcontroller = require('./dbcontroller');
const authController = require('./auth.controller');


/**
 * Send a message from one user to another. We support three types of messages `text`, `image` and `video` 
 */
module.exports.send = async (req, res) => {
  console.log("send message");
  try {
    authController.verifyAccessToken(req, res, function() {
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
  } catch (error) {
    res.status(500).json({message: "send message error - "+error});    
  }  
};


/**
 * Fetch all existing messages to a given recipient, within a range of message IDs.
 */
module.exports.get = async (req, res) => {
  console.log("get messages");
  try {
    authController.verifyAccessToken(req, res, function() {
      
      if(!req.query.recipient || !req.query.start || !req.query.limit )
        res.status(400).json({message:"invalid parameters"});     

      dbcontroller.getmessages(req.query.recipient, req.query.start, req.query.limit, (errl, msglist) => {
        if(errl) {
          res.status(500).json({message: "error retrieving messages - "+errl});
        }
        else{
          var objs = [];
          for (var i = 0;i < msglist.length; i++) {
              msglist[i].content = JSON.parse(msglist[i].content);
              objs.push(msglist[i]);
          }      
          console.log("messages ok");
          res.status(200).json({messages: objs});
        }
      });
    });    
  } catch (error) {
    res.status(500).json({message: "get messages error - "+error});    
  }
};

function validateMessageContentSchema (content, success, error) {
  //TODO 
  success();
  /*
  //TODO complete..
    try {
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
    } catch (error) {
      error(error);
    }
  */
}


