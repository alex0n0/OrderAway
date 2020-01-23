let jwt = require('jsonwebtoken');
const config = require('./config.js');

const loginstreams = require("./loginstreamkeys.js");

const db = require("../db");
let tokenGenerate = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let dbUsername;
    let dbPassword;


    let orderawaykey = "";
    if (req.body.stream) {
        switch (req.body.stream) {
            case "corporate":
                orderawaykey = loginstreams.corporate;
                break;
            case "kitchen":
                orderawaykey = loginstreams.kitchen;
                break;
            case "customer":
                orderawaykey = loginstreams.customer;
                break;
        }
    }

    db.Restaurant.findOne({ username: req.body.username })
        .then(function (dbRestaurant) {
            console.log(dbRestaurant);
            dbUsername = dbRestaurant.username;
            if (req.body.stream === "corporate") {
                dbPassword = dbRestaurant.password;
            } else {
                dbPassword = dbRestaurant.operationsPassword;
            }

            console.log(dbUsername, dbPassword);


            if (dbUsername && dbPassword) {
                if (username === dbUsername && password === dbPassword) {
                    let token = jwt.sign({ username: username },
                        config.secret,
                        {
                            expiresIn: '24h' // expires in 24 hours
                        }
                    );
                    // return the JWT token for the future API calls
                    var responseObj = {
                        success: true,
                        message: 'Authentication successful!',
                        token: token,
                        uid: dbRestaurant._id
                    }
                    responseObj.orderawaykey = orderawaykey;
                    console.log(responseObj);
                    res.json(responseObj);
                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect username or password'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'Authentication failed! Please check the request'
                });
            }
        })
        .catch(function (err) {
            res.json({
                success: false,
                message: 'Username not matched'
            });
        });
}

module.exports = {
    tokenGenerate: tokenGenerate
}