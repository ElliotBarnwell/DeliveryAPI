'use strict';


/**
 * Returns Robot availability
 *
 * returns RobotAvailableResponse
 **/
exports.getRobotAvailibility = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "available": true,
      "robotId": 111
    };
    if (Object.values(examples)[0].available == false) {
      throw new Error();
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
