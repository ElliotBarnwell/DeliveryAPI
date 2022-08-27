'use strict';

//Fixed rate for the delivery service per 1 unit of distance
const fixedRate = 2.00

/**
 * Customer accepts delivery
 *
 * deliveryId String The ID of the delivery requested
 * returns DeliveryAcceptedResponse
 **/
exports.acceptDelivery = function(deliveryId) {
  return new Promise(function(resolve, reject) {

    console.log("Delivery ID:" + deliveryId + " accepted");
    var examples = {};
    examples['application/json'] = {
      "deliveryId": deliveryId,
      "accepted": true
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}



/**
 * Returns All Deliveries
 *
 * returns Deliveries
 **/
exports.getDeliveries = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
      "deliveryId": 0.8008281904610115,
      "packageDelivered": true,
      "deliveryTime": "2022-06-23T05:33:43.019Z",
      "deliveryAccepted": true,
      "deliveryCoordinates": {
        "longSrc": 1.4658129805029452,
        "latDest": 5.962133916683182,
        "latSrc": 6.027456183070403,
        "longDest": 5.637376656633329
      }
    }, {
      "deliveryId": 0.8008281904610115,
      "packageDelivered": true,
      "deliveryTime": "2022-06-23T05:33:43.019Z",
      "deliveryAccepted": true,
      "deliveryCoordinates": {
        "longSrc": 1.4658129805029452,
        "latDest": 5.962133916683182,
        "latSrc": 6.027456183070403,
        "longDest": 5.637376656633329
      }
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns Delivery by ID
 *
 * deliveryId String The ID of the delivery requested
 * returns Delivery
 **/
exports.getdeliveryById = function(deliveryId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "deliveryId": 1,
      "packageDelivered": true,
      "deliveryTime": "2022-06-23T05:33:43.019Z",
      "deliveryAccepted": true,
      "deliveryCoordinates": {
        "longSrc": 1.4658129805029452,
        "latDest": 5.962133916683182,
        "latSrc": 6.027456183070403,
        "longDest": 5.637376656633329
      }
    };

    console.log("DeliveryIDs match? " + (deliveryId == Object.values(examples)[0].deliveryId));
    if (deliveryId != Object.values(examples)[0].deliveryId) {
      throw new Error();
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * request delivery
 *
 * body Delivery_body the destination coordinates (optional)
 * returns DestinationQuoteResponse
 **/
exports.requestDelivery = function(body) {
  return new Promise(function(resolve, reject) {

    console.log("Request delivery service");
    var examples = {};

    var x = Math.abs(body.latSrc - body.latDest);
    var y = Math.abs(body.longSrc - body.longDest);
    var dist = Math.sqrt(x*x + y*y);


    console.log("Distance: " + dist);

    if (dist == 0) {
      throw new Error();
    }
    var quote = Math.round(fixedRate * dist * 100)/ 100;
    console.log("Customer charged $" + quote + " for delivery");

    var currentDate = new Date();
    console.log("Current Date: " + currentDate);

    examples['application/json'] = {
      "delivery": {
        "deliveryId": 3,
        "packageDelivered": false,
        "deliveryTime": currentDate,
        "deliveryAccepted": false,
        "deliveryCoordinates": {
          "longSrc": body.latSrc,
          "latDest": body.latDest,
          "latSrc": body.latSrc,
          "longDest": body.longDest
        }
      },
      "quote": quote
    };

    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      console.log("invalid request");
      resolve();
    }
  });
}
