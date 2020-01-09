const path = require("path");
const uuidv4 = require("uuid/v4");
const moment = require("moment");
const db = require("../db");

const mongoose = require("mongoose");
module.exports = function (app) {
    // /////////////////////////////////////////////////////////////////////////////////
  
    app.post("/api/kitchen/create", function (req, res) {
        var menuItemObj = req.body.order;
        menuItemObj.isCompleted = false;


        var responseObj = {
            order: undefined
        }
        db.Order.create(menuItemObj)
        .then(function(dbOrder) {
            responseObj.order = dbOrder;
            res.json(responseObj);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
  
    // ////////////////////////////////////////////////////////////////////////////////////

}