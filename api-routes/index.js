const path = require("path");
const moment = require("moment");
const db = require("../db");
const fakedb = require("../server_fakedb");


var username = "";
username = "maxbrenner@gmail.com";
// username = "hungryjacks@gmail.com";
// username = "mcdonalds@gmail.com";


module.exports = function (app) {
    // ////////////////////////////////////////////////////////////////////////////////////
    app.post("/api/general/processlogin", function (req, res) {
        console.log(req.body.username, req.body.password);
        db.Restaurant.findOne({ username: req.body.username })
            .then(function (dbRestaurant) {
                console.log(dbRestaurant);
                if (req.body.password === dbRestaurant.password) {
                    res.json({ token: "successful!! ^o^ here is a token" });
                }
                else {
                    res.json({ token: undefined });
                }
            });
    });
    // OK 
    app.get("/api/allmenus", function (req, res) {
        var responseObj = {
            restaurant: {},
            menus: []
        }
        db.Restaurant.findOne({ username: username })
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
    // OK 
    app.post("/api/allmenus/create", function (req, res) {
        var newMenuObj = {
            restaurantId: req.body.restaurantId, menuTitle: req.body.menuTitle, isPublished: false, categories: []
        };
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
    // OK 
    app.post("/api/allmenus/duplicate", function (req, res) {
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
                // var newMenuObj = {
                //     ...dbMenu
                // }; // shallow copy, nested arrays and objects will not be copied
                // delete newMenuObj._id;
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
    // OK 
    app.put("/api/allmenus/rename", function (req, res) {
        var responseObj = {
            menu: undefined
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
    // OK 
    app.put("/api/allmenus/delete", function (req, res) {
        db.Menu.deleteOne({ _id: req.body.menuId })
            .then(function (outcome) {
                // console.log(outcome); // param is the outcome of delete
                res.json(outcome);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    // OK
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
        }
        db.Menu.findOne({ _id: req.params.id })
            .then(function (dbMenu) {
                if (!dbMenu.isPublished) {
                    responseObj.menu = dbMenu;
                    res.json(responseObj);
                } else {
                    res.json(responseObj);
                }
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.put("/api/menubuilder/save", function (req, res) {

        db.Menu.findOneAndUpdate({_id: req.body.menuId}, {categories: req.body.menu})
        .then(function(dbMenu) {
            res.json({status: "ok"});
        })

        // var menu = req.body.menu;
        // var menuIndex = fakedb.allmenus.findIndex(curr => {
        //     return String(curr.id) === req.params.id;
        // });
        // fakedb.allmenus[menuIndex].menu = menu;
        // res.json({ menuDetails: fakedb.allmenus[menuIndex] });
    });
    // /////////////////////////////////////////////////////////////////////////////////
    // OK
    app.get("/api/customer", function (req, res) {
        var responseObj = {
            menu: {}
        };

        db.Restaurant.findOne({ username: username })
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
    app.get("/api/kitchen", function (req, res) {

        var currTime = moment();
        var todayStart = moment(currTime.format("YYYY-MM-DD") + " 0:00", "YYYY-MM-DD HH:mm");

        var responseObj = {
            orders: []
        }
        db.Restaurant.findOne({ username: username })
            .then(function (dbRestaurant) {

                return db.Order.find(
                    {
                        restaurantId: dbRestaurant._id,
                        isCompleted: false,
                        orderTime: { $gt: parseInt(todayStart.format("X")) }
                    }
                ).sort({ orderTime: "asc" });
            })
            .then(function (dbOrders) {
                console.log(dbOrders);
                responseObj.orders = dbOrders;
                res.json(responseObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    app.get("/api/kitchen/:orderId", function (req, res) {

        db.Order.findOne({ _id: req.params.orderId }).populate("menuItems")
            .then(function (dbOrder) {
                res.json(dbOrder);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    app.post("/api/kitchen/create", function (req, res) {
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
    app.put("/api/kitchen/done", function (req, res) {
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