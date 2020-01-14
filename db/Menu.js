const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    createdAt: { type: Number },
    updatedAt: { type: Number },
    restaurantId: { type: String },
    menuTitle: { type: String },
    isPublished: { type: Boolean },
    categories: [
        {
            categoryId: { type: String },
            isHidden: { type: Boolean },
            categoryTitle: { type: String },
            menuItems: [
                {
                    menuItemId: { type: String },
                    isHidden: { type: Boolean },
                    imageUrl: { type: String },
                    imageOrientationLandscape: { type: Boolean },
                    menuItemTitle: { type: String },
                    description: { type: String },
                    price: { type: Number },
                    tags: {
                        vg: { type: Boolean },
                        v: { type: Boolean },
                        gf: { type: Boolean }
                    }
                }
            ]
        }
    ]
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;