const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema({
    restaurantId: { type: String },
    tableNumber: { type: Number },
    startTime: { type: Number },
    endTime: { type: Number },
    isCompleted: { type: Boolean }
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;