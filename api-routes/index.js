const path = require("path");
const moment = require("moment");
const db = require("../db");

var login = require("./tokengenerate.js");
let middleware = require('./tokencheck.js');




let signup = function (req, res, next) {
    var createObj = {
        restaurantTitle: req.body.restaurantTitle,
        iconUrl: req.body.iconUrl,
        username: req.body.username,
        password: req.body.password
    }
    db.Restaurant.create(createObj)
        .then(function (dbRestaurant) {
            next();
        }).catch(function (err) {
            console.log(err);
        });
}

module.exports = function (app) {
    // ////////////////////////////////////////////////////////////////////////////////////
    app.post("/api/general/signup", signup, login.tokenGenerate);
    app.post("/api/general/processlogin", login.tokenGenerate);

    app.post("/api/allmenus", middleware.tokenCheck, function (req, res) {
        var uid = req.body.uid;
        var responseObj = {
            restaurant: {},
            menus: []
        }
        db.Restaurant.findOne({ _id: uid })
            .then(function (dbRestaurant) {
                responseObj.restaurant = dbRestaurant;
                return db.Menu.find({ restaurantId: dbRestaurant._id }).sort({ menuTitle: "asc", _id: "asc" });
            })
            .then(function (docs) {
                responseObj.menus = docs;
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/api/allmenus/create", middleware.tokenCheck, function (req, res) {
        var newMenuObj = {
            restaurantId: req.body.uid, menuTitle: req.body.menuTitle, isPublished: false, categories: []
        };
        if (req.body.createdAt) {
            newMenuObj.createdAt = req.body.createdAt;
        }

        var responseObj = {
            menu: undefined,
        }
        db.Menu.create(newMenuObj)
            .then(function (dbMenu) {
                responseObj.menu = dbMenu;
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/api/allmenus/duplicate", middleware.tokenCheck, function (req, res) {
        var responseObj = {
            menu: undefined
        }
        db.Menu.findOne({ _id: req.body.menuId })
            .then(function (dbMenu) {
                var newMenuObj = {
                    restaurantId: dbMenu.restaurantId,
                    menuTitle: dbMenu.menuTitle,
                    isPublished: false,
                    categories: dbMenu.categories
                };
                if (req.body.createdAt) {
                    newMenuObj.createdAt = req.body.createdAt;
                }
                return db.Menu.create(newMenuObj);
            })
            .then(function (dbMenu) {
                responseObj.menu = dbMenu;
                res.json({ menu: dbMenu });
            })
            .catch(function (err) {
                res.json(err);
            });

    });

    app.put("/api/allmenus/rename", middleware.tokenCheck, function (req, res) {
        var responseObj = {
            menu: undefined
        }
        var updateObj = {
            menuTitle: req.body.menuTitle
        }
        if (req.body.updatedAt) {
            updateObj.updatedAt = req.body.updatedAt;
        }
        db.Menu.findOneAndUpdate({ _id: req.body.menuId }, updateObj)
            .then(function (dbMenu) {
                responseObj.updatedMenu = dbMenu;
                // console.log(dbMenu); // this is pre-update data
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.put("/api/allmenus/delete", middleware.tokenCheck, function (req, res) {
        db.Menu.deleteOne({ _id: req.body.menuId })
            .then(function (outcome) {
                // console.log(outcome); // param is the outcome of delete
                res.json(outcome);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.put("/api/allmenus/publish", middleware.tokenCheck, function (req, res) {
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
    app.get("/api/menubuilder/:id", middleware.tokenCheck, function (req, res) {
        var responseObj = {
            menu: undefined,
            restaurant: undefined
        }

        db.Menu.findOne({ _id: req.params.id })
            .then(function (dbMenu) {
                if (!dbMenu.isPublished) {
                    responseObj.menu = dbMenu;
                }
                return db.Restaurant.findOne({_id: dbMenu.restaurantId});
            })
            .then(function(dbRestaurant) {
                if (dbRestaurant) {
                    responseObj.restaurant = {restaurantTitle: dbRestaurant.restaurantTitle};
                }

                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.put("/api/menubuilder/save", middleware.tokenCheck, function (req, res) {

        var updateObj = { 
            categories: req.body.menu 
        }
        if (req.body.updatedAt) {
            updateObj.updatedAt = req.body.updatedAt;
        }
        db.Menu.findOneAndUpdate({ _id: req.body.menuId }, updateObj)
            .then(function (dbMenu) {
                res.json({ status: "ok" });
            })
    });
    // /////////////////////////////////////////////////////////////////////////////////

    app.post("/api/customer", middleware.tokenCheck, function (req, res) {
        var responseObj = {
            menu: {}
        };

        db.Restaurant.findOne({ _id: req.body.uid })
            .then(function (dbRestaurant) {
                return db.Menu.findOne({ restaurantId: dbRestaurant._id, isPublished: true });
            })
            .then(function (dbMenu) {
                // dbMenu = null if nothing is found
                if (dbMenu) {
                    responseObj.menu = dbMenu;
                }
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    // /////////////////////////////////////////////////////////////////////////////////
    app.post("/api/kitchen", middleware.tokenCheck, function (req, res) {

        var currTime = moment();
        var todayStart = moment(currTime.format("YYYY-MM-DD") + " 0:00", "YYYY-MM-DD HH:mm");

        var responseObj = {
            orders: []
        }
        db.Restaurant.findOne({ _id: req.body.uid })
            .then(function (dbRestaurant) {
                responseObj.restaurant = {
                    restaurantTitle: dbRestaurant.restaurantTitle,
                    iconUrl: dbRestaurant.iconUrl
                }

                return db.Order.find(
                    {
                        restaurantId: dbRestaurant._id,
                        isCompleted: false,
                        orderTime: { $gt: parseInt(todayStart.format("X")) }
                    }
                ).sort({ orderTime: "asc" });
            })
            .then(function (dbOrders) {
                responseObj.orders = dbOrders;
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    // app.get("/api/kitchen/:orderId", function (req, res) {

    //     db.Order.findOne({ _id: req.params.orderId }).populate("menuItems")
    //         .then(function (dbOrder) {
    //             res.json(dbOrder);
    //         })
    //         .catch(function (err) {
    //             res.json(err);
    //         });
    // });
    app.post("/api/kitchen/create", middleware.tokenCheck, function (req, res) {
        var menuItemObj = req.body.order;
        menuItemObj.isCompleted = false;

        var responseObj = {
            order: undefined
        }
        db.Order.create(menuItemObj)
            .then(function (dbOrder) {
                responseObj.order = dbOrder;
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    app.put("/api/kitchen/done", middleware.tokenCheck, function (req, res) {
        db.Order.findOneAndUpdate({ _id: req.body.orderId }, { isCompleted: true })
            .then(function (dbOrder) {
                // console.log(dbOrder) // pre-update data
                if (dbOrder) {
                    res.json({ order: dbOrder });
                } else {
                    res.json({ order: undefined });
                }
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    // ////////////////////////////////////////////////////////////////////////////////////

    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}