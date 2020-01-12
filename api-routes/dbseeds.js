const mongoose = require("mongoose");
const db = require("../db");

const uuidv4 = require("uuid/v4");




var objRestaurant1 = {
    restaurantTitle: "max brenner",
    username: "maxbrenner@gmail.com",
    password: "Asdf1234"
}
var objRestaurant1Menu1 = {
    restaurantId: undefined,
    menuTitle: "100% menu",
    isPublished: true,
    categories: []
};
var objRestaurant1Menu1Category1 = {
    categoryId: uuidv4(),
    isHidden: false,
    categoryTitle: "pizza",
    menuItems: []
};
var arrRestaurant1Menu1Category1MenuItems = [
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/Xxs2kwdM/w643-h428-cfill-q90/taste/2016/11/hawaiian-pizza-2628-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "hawaiian pizza",
        description: "Juicy pineapple on pizza",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/G-S0Iihh/w643-h428-cfill-q90/taste/2016/11/chicken-supreme-pizza-87871-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "supreme pizza",
        description: "a bit of everything",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/Tzf7Gbwg/w643-h428-cfill-q90/taste/2016/11/bbq-meatlovers-pizza-34466-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "meatlovers pizza",
        description: "5 kinds of meat",
        price: 12.99,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/-4Khkr79/w720-h480-cfill-q80/taste/2019/05/prawn-fetta-pizzas-149913-1.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "prawn and fetta pizza",
        description: "",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/qH9yxHr0/w720-h480-cfill-q80/taste/2019/04/pork-sausage-and-ricotta-pizzas-148994-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "Pork sausage and ricotta pizza",
        description: "",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/bRNtXRam/w720-h480-cfill-q80/taste/2019/03/lamb-and-eggplant-pastry-pizzas-148069-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "lamb and eggplant pastry pizza",
        description: "",
        price: 12.99,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/qKTwM-iZ/w720-h480-cfill-q80/taste/2019/07/pulled-beef-pizza-taste-152018-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "pulled beef pizza",
        description: "",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/TjYXfCAQ/w720-h480-cfill-q80/taste/2019/09/wholemeal-pizzas-with-tomato-pesto-153978-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "wholemeal tomato and pesto pizza",
        description: "",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/pX9xJm54/w720-h480-cfill-q80/taste/2019/01/speedy-zucchini-and-ricotta-pizza-with-crispy-kale-146056-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "zucchini and ricotta pizza with crispy kale",
        description: "",
        price: 12.99,
        tags: { vg: false, v: false, gf: false }
    }
]
var objRestaurant1Menu1Category2 = {
    categoryId: uuidv4(),
    isHidden: false,
    categoryTitle: "pasta",
    menuItems: []
};
var arrRestaurant1Menu1Category2MenuItems = [
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/9p-MxtKD/w643-h428-cfill-q90/taste/2016/11/squid-ink-pasta-with-calamari-92345-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "squid ink pasta",
        description: "makes your teeth black",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/k82dcCDv/w643-h428-cfill-q90/taste/2016/11/mid-week-lamb-ragu-92302-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "lamb ragu",
        description: "lamb",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/CTlLYX9-/w643-h428-cfill-q90/taste/2019/04/onepotcreamyporkpasta-148615-1.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "Creamy Tuscan Sausage Pasta",
        description: "tasty",
        price: 12.99,
        tags: { vg: false, v: false, gf: false }
    },
];
var objRestaurant1Menu1Category3 = {
    categoryId: uuidv4(),
    isHidden: false,
    categoryTitle: "dessert",
    menuItems: []
};
var arrRestaurant1Menu1Category3MenuItems = [
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/GVTd-82o/w643-h428-cfill-q90/taste/2016/11/mixed-gelato-24834-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "gelato",
        description: "mango",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/KpR2Rs53/w643-h428-cfill-q90/taste/2016/11/tiramisu-40927-1.jpeg",
        imageOrientationLandscape: true,
        menuItemTitle: "tiramisu",
        description: "sweet",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    }
];
var objRestaurant1Menu2 = {
    restaurantId: undefined,
    menuTitle: "empty menu",
    isPublished: false,
    categories: []
}


var objRestaurant2 = {
    restaurantTitle: "hungry jacks",
    username: "hungryjacks@gmail.com",
    password: "Asdf1234"
}
var objRestaurant2Menu1 = {
    restaurantId: undefined,
    menuTitle: "Burger menu",
    isPublished: false,
    categories: []
};
var objRestaurant2Menu1Category1 = {
    categoryId: uuidv4(),
    isHidden: false,
    categoryTitle: "burgers",
    menuItems: []
};
var arrRestaurant2Menu1Category1MenuItems = [
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/aeGMi2fv/w643-h428-cfill-q90/taste/2019/01/beef-burgers-with-spinach-fetta_taste-146311-1.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "Beef burgers with spinach and fetta",
        description: "",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/Tip1qG7D/w643-h428-cfill-q90/taste/2019/02/veggie-kimchi-burger-147372-1.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "Veggie and kimchi burger",
        description: "",
        price: 15.30,
        tags: { vg: true, v: true, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/ez51oIwU/w643-h428-cfill-q90/taste/2020/01/chicken-free-chicken-and-avocado-burger-02-157124-1.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "Chicken-free schnitzel and avocado burger",
        description: "",
        price: 15.30,
        tags: { vg: true, v: true, gf: false }
    },
    {
        menuItemId: uuidv4(),
        isHidden: false,
        imageUrl: "https://img.taste.com.au/b7r04U17/w643-h428-cfill-q90/taste/2019/09/beef-burger-with-tomato-salsa-154171-2.jpg",
        imageOrientationLandscape: true,
        menuItemTitle: "Beef burger with fresh tomato salsa",
        description: "",
        price: 15.30,
        tags: { vg: false, v: false, gf: false }
    }
];
var objRestaurant3 = {
    restaurantTitle: "mcdonalds",
    username: "mcdonalds@gmail.com",
    password: "Asdf1234"
}

objRestaurant1Menu1Category1.menuItems = arrRestaurant1Menu1Category1MenuItems;
objRestaurant1Menu1Category2.menuItems = arrRestaurant1Menu1Category2MenuItems;
objRestaurant1Menu1Category3.menuItems = arrRestaurant1Menu1Category3MenuItems;
objRestaurant1Menu1.categories.push(objRestaurant1Menu1Category1, objRestaurant1Menu1Category2, objRestaurant1Menu1Category3);


objRestaurant2Menu1Category1.menuItems = arrRestaurant2Menu1Category1MenuItems;
objRestaurant2Menu1.categories.push(objRestaurant2Menu1Category1);








module.exports = function (app) {
    app.get("/special/database/clear", function (req, res) {

        mongoose.connection.db.dropDatabase(function (err, result) {
            if (err) {
                console.log("CLEAR DB - ERROR (´Д｀。");
                res.json(err);
            } else {
                console.log("CLEAR DB - SUCCESS ヽ(＾Д＾)ﾉ");
                res.json({ outcome: "done" });
            }
        });
    });

    // this is the latest version
    app.get("/special/database/populate", function (req, res) {
        var arrRestaurants = [objRestaurant1, objRestaurant2, objRestaurant3];

        // create ALL restaurant
        db.Restaurant.create(arrRestaurants)
            .then(function (dbRestaurants) {
                objRestaurant1Menu1.restaurantId = dbRestaurants[0]._id;
                objRestaurant1Menu2.restaurantId = dbRestaurants[0]._id;
                objRestaurant2Menu1.restaurantId = dbRestaurants[1]._id;
                var arrMenus = [objRestaurant1Menu1, objRestaurant1Menu2, objRestaurant2Menu1];

                // create ALL menus
                return db.Menu.create(arrMenus);
            })
            .then(function (dbMenus) {
                console.log("POPULATE DB - SUCCESS ヽ(＾Д＾)ﾉ")
                res.json({ outcome: "done" })
            })
            .catch(function (err) {
                console.log("POPULATE DB - ERROR (´Д｀。");
                res.json(err);
            });
    });
}



// var objRestaurant1Menu1 = {
//     restaurantId: undefined,
//     menuTitle: "100% menu",
//     isPublished: true,
//     categories: [
//         {
//             categoryId: uuidv4(),
//             isHidden: { type: Boolean },
//             categoryTitle: { type: String },
//             menuItems: [
//                 {
//                     menuItemId: uuidv4(),
//                     isHidden: { type: Boolean },
//                     imageUrl: { type: String },
//                     imageOrientationLandscape: { type: Boolean },
//                     menuItemTitle: { type: String },
//                     description: { type: String },
//                     price: { type: Number },
//                     tags: {
//                         vg: { type: Boolean },
//                         v: { type: Boolean },
//                         gf: { type: Boolean }
//                     }
//                 }
//             ]
//         }
//     ]
// };