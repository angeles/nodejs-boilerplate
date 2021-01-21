const health = require('../models/health')

/**
 * Checks if the app is running fine.
 */
module.exports.check = async (req, res) => {
  var currentDate = new Date();
  health.health = "Ok";
  health.timestamp = currentDate.getTime();

  //TODO check the database status
  //SELECT name FROM sqlite_master WHERE type='table' AND name='users';
  //SELECT name FROM sqlite_master WHERE type='table' AND name='messages';

  console.log("health: " + health);
  res.json(health);
}