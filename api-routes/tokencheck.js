let jwt = require('jsonwebtoken');
const config = require('./config.js');

// module.exports = () => {}
// module.exports = function() {}
// function thisFunction() {}; module.exports = thisFunction;
// let thisFunction = funcitno() {}; moduel.exports = {thisFunction: thisFunction};

function tokenCheck(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase


  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        // console.log(false);
        // next();
        // return false;
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        // console.log(true);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // console.log(false);
    // next();

    // return false;
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  tokenCheck: tokenCheck
}