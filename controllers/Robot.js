'use strict';

var utils = require('../utils/writer.js');
var Robot = require('../service/RobotService');

module.exports.getRobotAvailibility = function getRobotAvailibility (req, res, next) {
  Robot.getRobotAvailibility()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
    res.status(404).json({error: "Robot not available"});
    });
};
