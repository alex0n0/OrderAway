let jwt = require('jsonwebtoken');
const config = require('./config.js');
const bcrypt = require("bcrypt");
const loginstreams = require("./loginstreamkeys.js");

const db = require("../db");
let tokenGenerate = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
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
            dbUsername = dbRestaurant.username;
            if (req.body.stream === "corporate") {
                dbPassword = dbRestaurant.password;
            } else {
                dbPassword = dbRestaurant.operationsPassword;
            }

            if (dbUsername && dbPassword) {
                // if (username === dbUsername && password === dbPassword) {
                if (username === dbUsername && bcrypt.compareSync(password, dbPassword)) {
                    let token = jwt.sign({ username: username },
                        config.secret,
                        {
                            expiresIn: '24h'
                        }
                    );
                    var responseObj = {
                        success: true,
                        message: 'Authentication successful!',
                        token: token,
                        uid: dbRestaurant._id
                    }
                    responseObj.orderawaykey = orderawaykey;
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