const path = require("path");
const uuidv4 = require("uuid/v4");
const moment = require("moment");
const fakedb = require("../server_fakedb");
const db = require("../db");

const mongoose = require("mongoose");
module.exports = function (app) {
    // ////////////////////////////////////////////////////////////////////////////////////

    app.post("/api/general/processlogin", function(req, res) {
        console.log(req.body.username, req.body.password);
        db.Restaurant.findOne({username: req.body.username})
        .then(function(dbRestaurant) {
            console.log(dbRestaurant);
            if (req.body.password === dbRestaurant.password) {
                res.json({token: "successful!! ^o^ here is a token"});
            }
            else {
                res.json({token: undefined});
            }
        });
    });

    app.get("/api/allmenus", function (req, res) {
        var responseObj = {
            restaurant: {},
            restaurantMenus: []
        }
        db.Restaurant.findOne({ username: "maxbrenner@gmail.com" })
            .then(function (dbRestaurant) {
                responseObj.restaurant = dbRestaurant;
                return db.Menu.find({ restaurantId: dbRestaurant._id }).sort({ menuTitle: "asc", _id: "asc" });
            })
            .then(function (docs) {
                responseObj.restaurantMenus = docs;
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    app.post("/api/allmenus/create", function (req, res) {
        var responseObj = {
            menu: undefined,
        }
        db.Menu.create({ restaurantId: req.body.restaurantId, menuTitle: req.body.menuTitle, isPublished: false })
            .then(function (dbMenu) {
                responseObj.menu = dbMenu;
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    // need to do
    app.post("/api/allmenus/duplicate", function (req, res) {
        var responseObj = {
            dbMenu: undefined
        }
        db.Menu.create({ restaurantId: req.body.restaurantId, menuTitle: req.body.menuTitle, isPublished: false })
            .then(function (dbMenu) {
                responseObj.dbMenu = dbMenu;
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    app.put("/api/allmenus/rename", function (req, res) {
        var responseObj = {
            updatedMenu: undefined
        }
        db.Menu.findOneAndUpdate({ _id: req.body.menuId }, { menuTitle: req.body.menuTitle })
            .then(function (dbMenu) {
                responseObj.updatedMenu = dbMenu;
                // console.log(dbMenu); // this is pre-update data
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    app.put("/api/allmenus/delete", function (req, res) {
        db.Menu.deleteOne({ _id: req.body.menuId })
            .then(function (outcome) {
                // console.log(outcome); // param is the outcome of delete
                return db.Category.deleteMany({ menuId: req.body.menuId });
            })
            .then(function (outcome) {
                // console.log(outcome); // param is the outcome of delete
                res.json(outcome);
            })
            .catch(function (err) {
                res.json(err);
            });

    });
    app.put("/api/allmenus/publish", function (req, res) {
        var responseObj = {
            newPublishedMenu: undefined,
            oldPublishedMenu: undefined
        }
        db.Menu.findOneAndUpdate({ _id: req.body.menuId }, { isPublished: true })
            .then(function (dbMenu) {
                responseObj.newPublishedMenu = dbMenu;
                if (req.body.currentlyPublishedMenuId) {
                    db.Menu.findOneAndUpdate({ _id: req.body.currentlyPublishedMenuId }, { isPublished: false })
                        .then(function (dbMenu) {
                            responseObj.oldPublishedMenu = dbMenu;
                            res.json(responseObj);
                        });
                } else {
                    res.json(responseObj);
                }
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // /////////////////////////////////////////////////////////////////////////////////
    app.get("/api/menubuilder/:id", function (req, res) {
        var responseObj = {
            menu: undefined,
            isPublished: false
        }
        db.Menu.findOne({_id: req.params.id})
        .then(function(dbMenu) {
            if (!dbMenu.isPublished) {
                return db.Category.find({menuId: dbMenu._id}).populate("menuItems");
            } else {
                responseObj.isPublished = true;
                return [];
            }
        })
        .then(function(dbCategories) {
            responseObj.menu = dbCategories;
            res.json(responseObj);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.put("/api/menubuilder/:id/save", function (req, res) {
        var menu = req.body.menu;
        var menuIndex = fakedb.allmenus.findIndex(curr => {
            return String(curr.id) === req.params.id;
        });
        fakedb.allmenus[menuIndex].menu = menu;
        res.json({ menuDetails: fakedb.allmenus[menuIndex] });
    });
    // /////////////////////////////////////////////////////////////////////////////////
    app.get("/api/customer", function (req, res) {
        var responseObj = {
            restaurant: {},
            menu: []
        };

        db.Restaurant.findOne({ username: "maxbrenner@gmail.com" })
            .then(function (dbRestaurant) {
                responseObj.restaurant = dbRestaurant;
                return db.Menu.find({ restaurantId: dbRestaurant._id, isPublished: true });
            })
            .then(function (dbMenus) {
                if (dbMenus.length > 0) {
                    var publishedMenuId = dbMenus[0]._id;
                    return db.Category.find({ menuId: publishedMenuId }).populate("menuItems");
                }
                else {
                    return [];
                }
            })
            .then(function (dbCategories) {
                responseObj.menu = dbCategories;
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });

        var publishedMenu = fakedb.allmenus.find(curr => {
            return curr.published === true;
        });
    });
    // /////////////////////////////////////////////////////////////////////////////////
    app.get("/api/kitchen", function (req, res) {

        var currTime = moment();
        var todayStart = moment(currTime.format("YYYY-MM-DD") + " 0:00", "YYYY-MM-DD HH:mm");

        var responseObj = {
            restaurant: undefined,
            orders: []
        }
        db.Restaurant.findOne({ username: "maxbrenner@gmail.com" })
            .then(function (dbRestaurant) {
                responseObj.restaurant = dbRestaurant;
                return db.Order.find(
                    {
                        restaurantId: dbRestaurant._id,
                        isCompleted: false,
                        orderTime: { $gt: parseInt(todayStart.format("X")) }
                    }
                ).populate("menuItems");
            })
            .then(function (dbOrders) {
                responseObj.orders = dbOrders;
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    app.post("/api/kitchen/create", function (req, res) {
        var menuItemObj = {
            restaurantId: req.body.restaurantId,
            isCompleted: false,
            tableNumber: req.body.tableNumber,
            orderTime: req.body.orderTime,
            category: [req.body.menuItem.category],
            quantity: [req.body.menuItem.quantity],
            menuItems: [req.body.menuItem._id]
        }
        var responseObj = {
            order: undefined
        }
        db.Order.create(menuItemObj)
        .then(function(dbOrder) {
            responseObj.order = dbOrder;
            res.json(responseObj);
        });
    });
    app.put("/api/kitchen/done", function (req, res) {
        db.Order.findOneAndUpdate({_id: req.body.orderId}, {isCompleted: true})
        .then(function(dbOrder) {
            console.log(dbOrder) // pre-update data
            if (dbOrder) {
                res.json({order: dbOrder});
            } else {
                res.json({order: undefined});
            }
        })
        .catch(function(err) {
            res.json(err);
        });
    });
    // ////////////////////////////////////////////////////////////////////////////////////

    app.get("/testingproxy", function (req, res) {
        res.json({ "message": "proxy was successful" });
        // res.status(404).end(); // not found
        // res.status(400).end(); // bad request
    });


    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}