const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    restaurantTitle: { type: String },
    iconUrl: { type:String },
    username: { type: String },
    password: { type: String }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;