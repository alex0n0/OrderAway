const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    isHidden: { type: Boolean },
    imageUrl: { type: String },
    imageOrientationLandscape: { type: Boolean },
    menuItemTitle: { type: String },
    description: { type: String },
    price: { type: Number },
    tags: {
        vg: { type: Boolean},
        v: { type: Boolean},
        gf: { type: Boolean}
    }
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;