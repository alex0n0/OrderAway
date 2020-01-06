const mongoose = require("mongoose");

const db = require("../db");

const moment = require("moment");

var restaurants = [
    {
        restaurantTitle: "max brenner",
        username: "maxbrenner@gmail.com",
        password: "Asdf1234"
    }
];

var menus = [
    {
        menuTitle: "basic menu",
        isPublished: true,
    },
    {
        menuTitle: "menu 1",
        isPublished: false,
    }
];



var categories = [
    {
        categoryTitle: "pizza",
        isHidden: false
    },
    {
        categoryTitle: "pasta",
        isHidden: false
    },
    {
        categoryTitle: "dessert",
        isHidden: false
    }
];


var menuItemsCategory1 = [
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/Xxs2kwdM/w643-h428-cfill-q90/taste/2016/11/hawaiian-pizza-2628-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "hawaiian pizza",
        description: "Juicy pineapple on pizza",
        price: 15.30,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/G-S0Iihh/w643-h428-cfill-q90/taste/2016/11/chicken-supreme-pizza-87871-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "supreme pizza",
        description: "a bit of everything",
        price: 15.30,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/Tzf7Gbwg/w643-h428-cfill-q90/taste/2016/11/bbq-meatlovers-pizza-34466-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "meatlovers pizza",
        description: "5 kinds of meat",
        price: 12.99,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/-4Khkr79/w720-h480-cfill-q80/taste/2019/05/prawn-fetta-pizzas-149913-1.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "prawn and fetta pizza",
        description: "",
        price: 15.30,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/qH9yxHr0/w720-h480-cfill-q80/taste/2019/04/pork-sausage-and-ricotta-pizzas-148994-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "Pork sausage and ricotta pizza",
        description: "",
        price: 15.30,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/bRNtXRam/w720-h480-cfill-q80/taste/2019/03/lamb-and-eggplant-pastry-pizzas-148069-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "lamb and eggplant pastry pizza",
        description: "",
        price: 12.99,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/qKTwM-iZ/w720-h480-cfill-q80/taste/2019/07/pulled-beef-pizza-taste-152018-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "pulled beef pizza",
        description: "",
        price: 15.30,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/TjYXfCAQ/w720-h480-cfill-q80/taste/2019/09/wholemeal-pizzas-with-tomato-pesto-153978-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "wholemeal tomato and pesto pizza",
        description: "",
        price: 15.30,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/pX9xJm54/w720-h480-cfill-q80/taste/2019/01/speedy-zucchini-and-ricotta-pizza-with-crispy-kale-146056-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "zucchini and ricotta pizza with crispy kale",
        description: "",
        price: 12.99,
        tags: {
            vg: false,
            v: true,
            gf: false
        }
    },
];




var menuItemsCategory2 = [
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/9p-MxtKD/w643-h428-cfill-q90/taste/2016/11/squid-ink-pasta-with-calamari-92345-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "squid ink pasta",
        description: "makes your teeth black",
        price: 15.30,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/k82dcCDv/w643-h428-cfill-q90/taste/2016/11/mid-week-lamb-ragu-92302-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "lamb ragu",
        description: "lamb",
        price: 15.30,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/CTlLYX9-/w643-h428-cfill-q90/taste/2019/04/onepotcreamyporkpasta-148615-1.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "Creamy Tuscan Sausage Pasta",
        description: "tasty",
        price: 12.99,
        tags: {
            vg: false,
            v: false,
            gf: false
        }
    },
];



var menuItemsCategory3 = [
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/GVTd-82o/w643-h428-cfill-q90/taste/2016/11/mixed-gelato-24834-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "gelato",
        description: "mango",
        price: 15.30,
        tags: {
            vg: true,
            v: true,
            gf: true
        }
    },
    {
        isHidden: false,
        imageUrl: "https://img.taste.com.au/KpR2Rs53/w643-h428-cfill-q90/taste/2016/11/tiramisu-40927-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "tiramisu",
        description: "sweet",
        price: 15.30,
        tags: {
            vg: true,
            v: true,
            gf: false
        }
    }
];





module.exports = function (app) {
    app.get("/special/database/clear", function (req, res) {
        console.log("CLEARED");
        mongoose.connection.db.dropDatabase(function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({ outcome: "done" });
            }
        });
    });

    // this is the latest version
    app.get("/special/database/populate", function (req, res) {

        var restaurantIds = [];
        var categoryIds = [];
        var menuItemIds = {};

        // create ONE restaurant
        db.Restaurant.create(restaurants[0])
            .then(function (dbRestaurant) {
                restaurantIds.push(dbRestaurant._id);
                menus.forEach(curr => {
                    curr.restaurantId = dbRestaurant._id;
                });

                // create TWO menus for FIRST restaurant
                return db.Menu.insertMany(menus);
            })
            .then(function (docs) {
                categories.forEach(curr => {
                    curr.menuId = docs[0]._id;
                });
                // create THREE categories for FIRST menu
                return db.Category.insertMany(categories);
            })
            .then(function (docs) {
                docs.forEach(curr => {
                    categoryIds.push(curr._id);
                });

                // create MANY menuItem FIRST categories
                return db.MenuItem.insertMany(menuItemsCategory1);
            })
            .then(function (docs) {
                menuItemIds.category1 = [];
                docs.forEach(curr => {
                    menuItemIds.category1.push(curr._id);
                });
                // create MANY menuItem SECOND categories
                return db.MenuItem.insertMany(menuItemsCategory2);
            })
            .then(function (docs) {
                menuItemIds.category2 = [];
                docs.forEach(curr => {
                    menuItemIds.category2.push(curr._id);
                });
                // create MANY menuItem THIRD categories
                return db.MenuItem.insertMany(menuItemsCategory3);
            })
            .then(function (docs) {
                menuItemIds.category3 = [];
                docs.forEach(curr => {
                    menuItemIds.category3.push(curr._id);
                });

                return db.Category.findOneAndUpdate(
                    { _id: categoryIds[0] },
                    {
                        $push:
                        {
                            menuItems:
                                { $each: menuItemIds.category1.map(curr => curr) }
                        }
                    }
                );
            })
            .then(function (dbCategory) {
                return db.Category.findOneAndUpdate(
                    { _id: categoryIds[1] },
                    {
                        $push:
                        {
                            menuItems:
                                { $each: menuItemIds.category2.map(curr => curr) }
                        }
                    }
                );
            })
            .then(function (dbCategory) {
                return db.Category.findOneAndUpdate(
                    { _id: categoryIds[2] },
                    {
                        $push:
                        {
                            menuItems:
                                { $each: menuItemIds.category3.map(curr => curr) }
                        }
                    }
                );
            })
            .then(function (dbCategory) {
                console.log(menuItemIds.category1[0]._id);
                return db.Order.create({
                    restaurantId: restaurantIds[0],
                    tableNumber: 2,
                    orderTime: parseInt(moment().format("X")),
                    quantity: [2, 3],
                    category: ["pizza", "pasta"],
                    menuItems: [menuItemIds.category1[0]._id, menuItemIds.category1[2]._id],
                    isCompleted: false
                });
            })
            .then(function (dbCategory) {
                res.json({ outcome: "done" })
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // app.get("/special/database/populate_old", function (req, res) {

    //     var restaurantIds = [];
    //     var menuIds = [];
    //     var categoryIds = [];
    //     var menuItemCategory1Ids = [];
    //     var menuItemCategory2Ids = [];
    //     var menuItemCategory3Ids = [];


    //     // creating first restaurant
    //     db.Restaurant.create(restaurants[0])
    //         .then(function (dbRestaurant) {
    //             restaurantIds.push(dbRestaurant._id);




    //             // creating first menu
    //             return db.Menu.create(menus[0]);
    //         })
    //         .then(function (dbMenu) {
    //             menuIds.push(dbMenu._id);
    //             // creating second menu
    //             return db.Menu.create(menus[1]);
    //         })
    //         .then(function (dbMenu) {
    //             menuIds.push(dbMenu._id);
    //             // adding menus to restaurant
    //             return db.Restaurant.findOneAndUpdate({ _id: restaurantIds[0] }, { $push: { menus: { $each: menuIds } } }, { new: true });
    //         })
    //         .then(function (dbRestaurant) {





    //             // creating first category
    //             return db.Category.create(categories[0]);
    //         })
    //         .then(function (dbCategory) {
    //             categoryIds.push(dbCategory._id);
    //             // creating second category
    //             return db.Category.create(categories[1]);
    //         })
    //         .then(function (dbCategory) {
    //             categoryIds.push(dbCategory._id);
    //             // creating third category
    //             return db.Category.create(categories[2]);
    //         })
    //         .then(function (dbCategory) {
    //             categoryIds.push(dbCategory._id);
    //             // adding category to menu
    //             return db.Menu.findOneAndUpdate({ _id: menuIds[0] }, { $push: { categories: { $each: categoryIds } } }, { new: true });
    //         })
    //         .then(function (dbCategory) {








    //             // creating first menu item 1 category 1
    //             return db.MenuItem.create(menuItemsCategory1[0]);
    //         })
    //         .then(function (dbMenuItem) {
    //             menuItemCategory1Ids.push(dbMenuItem._id);
    //             // creating second menu item 2 category 1
    //             return db.MenuItem.create(menuItemsCategory1[1]);
    //         })
    //         .then(function (dbMenuItem) {
    //             menuItemCategory1Ids.push(dbMenuItem._id);
    //             // creating third menu item 3 category 1
    //             return db.MenuItem.create(menuItemsCategory1[2]);
    //         })
    //         .then(function (dbMenuItem) {
    //             menuItemCategory1Ids.push(dbMenuItem._id);





    //             // creating first menu item 1 category 2
    //             return db.MenuItem.create(menuItemsCategory2[0]);
    //         })
    //         .then(function (dbMenuItem) {
    //             menuItemCategory2Ids.push(dbMenuItem._id);
    //             // creating second menu item 2 category 2
    //             return db.MenuItem.create(menuItemsCategory2[1]);
    //         })
    //         .then(function (dbMenuItem) {
    //             menuItemCategory2Ids.push(dbMenuItem._id);
    //             // creating second menu item 3 category 2
    //             return db.MenuItem.create(menuItemsCategory2[2]);
    //         })
    //         .then(function (dbMenuItem) {
    //             menuItemCategory2Ids.push(dbMenuItem._id);






    //             // creating second menu item 1 category 3
    //             return db.MenuItem.create(menuItemsCategory3[0]);
    //         })
    //         .then(function (dbMenuItem) {
    //             menuItemCategory3Ids.push(dbMenuItem._id);
    //             // creating first menu item 2 category 3
    //             return db.MenuItem.create(menuItemsCategory3[1]);
    //         })
    //         .then(function (dbMenuItem) {
    //             menuItemCategory3Ids.push(dbMenuItem._id);
    //             // creating first menu item 3 category 3
    //             return db.MenuItem.create(menuItemsCategory3[2]);
    //         })
    //         .then(function (dbMenuItem) {






    //             return db.Category.findOneAndUpdate(
    //                 { _id: categoryIds[0] },
    //                 {
    //                     $push: {
    //                         menuItems: {
    //                             $each: menuItemCategory1Ids.map(curr => { return { menuItem: curr, isHidden: false } })
    //                         }
    //                     }
    //                 },
    //                 { new: true });
    //         })
    //         .then(function (dbCategory) {
    //             return db.Category.findOneAndUpdate(
    //                 { _id: categoryIds[1] },
    //                 {
    //                     $push: {
    //                         menuItems: {
    //                             $each: menuItemCategory2Ids.map(curr => { return { menuItem: curr, isHidden: false } })
    //                         }
    //                     }
    //                 },
    //                 { new: true });
    //         })
    //         .then(function (dbCategory) {
    //             return db.Category.findOneAndUpdate(
    //                 { _id: categoryIds[2] },
    //                 {
    //                     $push: {
    //                         menuItems: {
    //                             $each: menuItemCategory3Ids.map(curr => { return { menuItem: curr, isHidden: false } })
    //                         }
    //                     }
    //                 },
    //                 { new: true });
    //         })
    //         .then(function (dbCategory) {
    //             res.json({ outcome: "done" })
    //         })
    //         .catch(function (err) {
    //             res.json(err);
    //         });
    // });
}
