const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    restaurantId: { type: String },
    menuTitle: { type: String },
    isPublished: { type: Boolean }
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;