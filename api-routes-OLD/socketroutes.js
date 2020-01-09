const path = require("path");
const uuidv4 = require("uuid/v4");
const moment = require("moment");
const db = require("../db");

const mongoose = require("mongoose");
module.exports = function (app) {
    // /////////////////////////////////////////////////////////////////////////////////
  
    app.post("/api/kitchen/create", function (req, res) {
        // console.log(req.body.menuItem);
        var menuItemObj = {
            restaurantId: req.body.restaurantId,
            isCompleted: false,
            tableNumber: req.body.tableNumber,
            orderTime: req.body.orderTime,
            category: [req.body.menuItem.category],
            quantity: [req.body.menuItem.quantity],
            menuItems: [req.body.menuItem._id],

        }
        var responseObj = {
            order: undefined
        }
        db.Order.create(menuItemObj)
        .then(function(dbOrder) {
            responseObj.order = dbOrder;
            // dbOrder.menuItemTitles = [req.body.menuItem.menuItemTitle];
            // socket.emit("order", {message: "hello"});
            res.json(responseObj);
            // socket.emit("orderzzzzz", {connectionTest: "available", orderId: dbOrder._id});
            // console.log("emit");

            // return db.Order.findOne({_id: dbOrder._id}).populate("menuItems");
        });
    });
  
    // ////////////////////////////////////////////////////////////////////////////////////

}