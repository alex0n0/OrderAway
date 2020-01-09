const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    restaurantId: { type: String },
    tableNumber: { type: Number },
    orderTime: { type: Number },
    quantity: [
        { type: Number }
    ],
    category: [
        { type: String }
    ],
    menuItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'MenuItem'
        }
    ],
    isCompleted: { type: Boolean }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;