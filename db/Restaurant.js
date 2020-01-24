const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    restaurantTitle: { type: String },
    iconUrl: { type:String },
    username: { type: String, unique : true },
    password: { type: String },
    operationsPassword: { type: String }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;