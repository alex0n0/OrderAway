const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    restaurantId: { type: String },
    tableNumber: { type: Number },
    orderTime: { type: Number },
    menuItems: [
        {
            menuTitle: { type: String },
            categoryTitle: { type: String },
            menuItemTitle: { type: String },
            price: { type: Number },
            quantity: { type: Number },
        }
    ],
    isCompleted: { type: Boolean }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;