let jwt = require('jsonwebtoken');
const config = require('./config.js');

const db = require("../db");
let tokenGenerate = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let dbUsername;
    let dbPassword;


    db.Restaurant.findOne({ username: req.body.username })
        .then(function (dbRestaurant) {
            dbUsername = dbRestaurant.username;
            dbPassword = dbRestaurant.password;

            if (dbUsername && dbPassword) {
                if (username === dbUsername && password === dbPassword) {
                    let token = jwt.sign({ username: username },
                        config.secret,
                        {
                            expiresIn: '24h' // expires in 24 hours
                        }
                    );
                    // return the JWT token for the future API calls
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token,
                        uid: dbRestaurant._id
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect username or password'
                    });
                    // res.send(403).json({
                    //     success: false,
                    //     message: 'Incorrect username or password'
                    // });
                }
            } else {
                res.json({
                    success: false,
                    message: 'Authentication failed! Please check the request'
                });
                // res.send(400).json({
                //     success: false,
                //     message: 'Authentication failed! Please check the request'
                // });
            }
        })
        .catch(function(err) {
            res.json({
                success: false,
                message: 'Username not matched'
            });
        });
}

module.exports = {
    tokenGenerate: tokenGenerate
}