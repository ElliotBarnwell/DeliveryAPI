'use strict';

var utils = require('../utils/writer.js');
var Delivery = require('../service/DeliveryService');
var Robot = require('../service/RobotService');

module.exports.acceptDelivery = function acceptDelivery(req, res, next, body, deliveryId) {
  Delivery.acceptDelivery(body, deliveryId)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDeliveries = function getDeliveries(req, res, next) {
  Delivery.getDeliveries()
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getdeliveryById = function getdeliveryById(req, res, next, deliveryId) {
  Delivery.getdeliveryById(deliveryId)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      res.status(404).json({error: "Delivery ID not found"});
    });
};

module.exports.requestDelivery = function requestDelivery(req, res, next, body) {
  //check for robot Availability
  Robot.getRobotAvailibility()
    .then(function(response) {
      let robotAvailable = response.available;

      if (robotAvailable) {
        Delivery.requestDelivery(body)
          .then(function(response) {
            utils.writeJson(res, response);
          })
          .catch(function(response) {
            res.status(400).json({error: "Invalid Destination"});
          });
      }
    })
    .catch(function(response) {
      res.status(404).json({error: "Robot not available"});
    });


};
