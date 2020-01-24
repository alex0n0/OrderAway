let jwt = require('jsonwebtoken');
const config = require('./config.js');

const loginstreams = require("./loginstreamkeys.js");

// module.exports = () => {}
// module.exports = function() {}
// function thisFunction() {}; module.exports = thisFunction;
// let thisFunction = funcitno() {}; moduel.exports = {thisFunction: thisFunction};

function tokenCheck(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase


  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};


function streamCheck(req, res) {
  var responseObj = {
    streamFound: false,
    message: "no stream found",
    path: undefined
  }
  switch (req.body.orderawaykey) {
    case loginstreams.corporate:
      responseObj.streamFound = true;
      responseObj.message = "stream found";
      responseObj.path = "/corporate";
      break;
    case loginstreams.kitchen:
      responseObj.streamFound = true;
      responseObj.message = "stream found";
      responseObj.path = "/kitchen";
      break;
    case loginstreams.customer:
      responseObj.streamFound = true;
      responseObj.message = "stream found";
      responseObj.path = "/customer";
      break;
  }
  return res.json(responseObj);
}
function corporateStreamCheck(req, res, next) {
  var responseObj = {
    success: undefined,
    message: undefined,
    path: undefined
  }
  if (req.body.orderawaykey === loginstreams.corporate) {
    next();
  } else {
    responseObj.success = false;
    responseObj.message = "Stream mismatch";
    switch (req.body.orderawaykey) {
      case loginstreams.kitchen:
        responseObj.path = "/kitchen";
        break;
      case loginstreams.customer:
        responseObj.path = "/customer";
        break;
    }
    return res.json(responseObj);
  }
}
function kitchenStreamCheck(req, res, next) {
  var responseObj = {
    success: undefined,
    message: undefined,
    path: undefined
  }
  if (req.body.orderawaykey === loginstreams.kitchen) {
    next();
  } else {
    responseObj.success = false;
    responseObj.message = "Stream mismatch";
    switch (req.body.orderawaykey) {
      case loginstreams.corporate:
        responseObj.path = "/corporate";
        break;
      case loginstreams.customer:
        responseObj.path = "/customer";
        break;
    }
    return res.json(responseObj);
  }
}
function customerStreamCheck(req, res, next) {
  var responseObj = {
    success: undefined,
    message: undefined,
    path: undefined
  }
  if (req.body.orderawaykey === loginstreams.customer) {
    next();
  } else {
    responseObj.success = false;
    responseObj.message = "Stream mismatch";
    switch (req.body.orderawaykey) {
      case loginstreams.corporate:
        responseObj.path = "/corporate";
        break;
      case loginstreams.kitchen:
        responseObj.path = "/kitchen";
        break;
    }
    return res.json(responseObj);
  }
}

module.exports = {
  tokenCheck: tokenCheck,
  streamCheck: streamCheck,
  corporateStreamCheck: corporateStreamCheck,
  kitchenStreamCheck: kitchenStreamCheck,
  customerStreamCheck: customerStreamCheck,
}