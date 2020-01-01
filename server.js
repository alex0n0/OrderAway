const express = require("express");
const app = express();
const path = require("path");
const uuidv4 = require('uuid/v4');
const moment = require('moment');

const fakedb = require("./server_fakedb");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));










// ////////////////////////////////////////////////////////////////////////////////////
app.get("/api/allmenus", function (req, res) {
    // res.json({allmenus: []}); // - SUCCESSFULLY PASSED EMPTY ARRAY TEST
    res.json({ allmenus: fakedb.allmenus });
});
app.post("/api/allmenus/create", function (req, res) {
    var id = uuidv4();
    fakedb.allmenus.push({
        title: req.body.title, id: id, parentid: id, published: false, menu: []
    });
    res.json({ allmenus: fakedb.allmenus });
});
app.post("/api/allmenus/duplicate", function (req, res) {
    var id = uuidv4();
    var foundMenuIndex = -1;
    foundMenuIndex = fakedb.allmenus.findIndex(curr => {
        return String(curr.id) === String(req.body.id);
    });
    if (foundMenuIndex !== -1) {
        var menu = {
            title: req.body.title, id: id, parentid: req.body.id, published: false, menu: fakedb.allmenus[foundMenuIndex].menu
        };
        fakedb.allmenus.push(menu);
    } else {
        fakedb.allmenus.push({
            title: req.body.title, id: id, parentid: req.body.id, published: false, menu: []
        });    
    }
    res.json({ allmenus: fakedb.allmenus });
});
app.put("/api/allmenus/rename", function (req, res) {
    var foundMenuIndex = -1;
    foundMenuIndex = fakedb.allmenus.findIndex(curr => {
        return curr.id === req.body.id;
    });
    if (foundMenuIndex !== -1) {
        fakedb.allmenus[foundMenuIndex].title = req.body.title;
    }
    res.json({ allmenus: fakedb.allmenus });
});
app.put("/api/allmenus/delete", function (req, res) {
    var foundMenuIndex = -1;
    foundMenuIndex = fakedb.allmenus.findIndex(curr => {
        return curr.id === req.body.id;
    });
    if (foundMenuIndex !== -1) {
        fakedb.allmenus.splice(foundMenuIndex, 1);
    }
    res.json({ allmenus: fakedb.allmenus });
});
app.put("/api/allmenus/publish", function (req, res) {
    var foundMenuToUnpublishIndex = -1;
    foundMenuToUnpublishIndex = fakedb.allmenus.findIndex(curr => {
        return curr.published === true;
    });
    if (foundMenuToUnpublishIndex !== -1) {
        fakedb.allmenus[foundMenuToUnpublishIndex].published = false;
    }
    var foundMenuToPublishIndex = -1;
    foundMenuToPublishIndex = fakedb.allmenus.findIndex(curr => {
        return curr.id === req.body.id;
    });
    if (foundMenuToPublishIndex !== -1) {
        fakedb.allmenus[foundMenuToPublishIndex].published = true;
    }
    
    res.json({ allmenus: fakedb.allmenus });
});

// /////////////////////////////////////////////////////////////////////////////////
app.get("/api/menubuilder/:id", function(req, res) {
    var menu = fakedb.allmenus.find(curr => {
        return String(curr.id) === req.params.id;
    });
    res.json({menuDetails: menu});
});
// not part of design
// app.post("/api/menubuilder/:id/createcategory", function(req, res) {
//     var menuIndex = fakedb.allmenus.findIndex(curr => {
//         return String(curr.id) === req.params.id;
//     });

//     fakedb.allmenus[menuIndex].menu.push({
//         id: uuidv4(),
//         category: req.body.category,
//         menuItems: []
//     });

//     res.json({menu: fakedb.allmenus[menuIndex]});
// });
// not part of design
// app.put("/api/menubuilder/:id/renamecategory", function(req, res) {
//     var menuIndex = fakedb.allmenus.findIndex(curr => {
//         return String(curr.id) === req.params.id;
//     });
//     var menuCategoryIndex = fakedb.allmenus[menuIndex].menu.findIndex(curr => {
//         return String(curr.id) === String(req.body.id);
//     });
//     fakedb.allmenus[menuIndex].menu[menuCategoryIndex].category = req.body.category;
//     res.json({menu: fakedb.allmenus[menuIndex]});
// });
app.put("/api/menubuilder/:id/save", function(req, res) {
    var menu = req.body.menu;
    var menuIndex = fakedb.allmenus.findIndex(curr => {
        return String(curr.id) === req.params.id;
    });
    fakedb.allmenus[menuIndex].menu = menu;
    res.json({menuDetails: fakedb.allmenus[menuIndex]});
});
// /////////////////////////////////////////////////////////////////////////////////
app.get("/api/customer", function (req, res) {
    // res.json({menu: []}); // - SUCCESSFULLY PASSED EMPTY ARRAY TEST
    var publishedMenu = fakedb.allmenus.find(curr => {
        return curr.published === true;
    });
    res.json(publishedMenu);
});
// /////////////////////////////////////////////////////////////////////////////////
app.get("/api/kitchen", function (req, res) {
    // res.json({orders: []}); // - SUCCESSFULLY PASSED EMPTY ARRAY TEST
    var currTime = moment();
    var todayStart = moment(currTime.format("YYYY-MM-DD") + " 0:00", "YYYY-MM-DD HH:mm");
    var orders = fakedb.orders;
    var filteredOrders = orders.filter(curr => {
        return parseInt(curr.orderTime) >= parseInt(todayStart.format("X"));
    });
    res.json({ orders: filteredOrders });
});
app.post("/api/kitchen/create", function (req, res) {
    var menuItem = req.body.menuItem
    fakedb.orders.push(
        {
            id: uuidv4(),
            tableNumber: menuItem.tableNumber,
            orderTime: menuItem.orderTime,
            items: [
                {
                    category: menuItem.category,
                    id: menuItem.id,
                    title: menuItem.title,
                    quantity: menuItem.quantity
                }
            ]
        }
    );
    res.status(200).end();
});
app.put("/api/kitchen/done", function (req, res) {
    var foundOrderItemIndex = -1;
    foundOrderItemIndex = fakedb.orders.findIndex((curr, i) => {
        return curr.id === req.body.orderItem.id;
    });
    if (foundOrderItemIndex !== -1) {
        fakedb.orders.splice(foundOrderItemIndex, 1);
    }
    var currTime = moment();
    var todayStart = moment(currTime.format("YYYY-MM-DD") + " 0:00", "YYYY-MM-DD HH:mm");
    var orders = fakedb.orders;
    var filteredOrders = orders.filter(curr => {
        return parseInt(curr.orderTime) >= parseInt(todayStart.format("X"));
    });
    res.json({ orders: filteredOrders });
});
// ////////////////////////////////////////////////////////////////////////////////////

app.get("/testingproxy", function (req, res) {
    res.json({ "message": "proxy was successful" });
    // res.status(404).end(); // not found
    // res.status(400).end(); // bad request
});


app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});










const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, function () {
    console.log("server started on port", PORT);
});