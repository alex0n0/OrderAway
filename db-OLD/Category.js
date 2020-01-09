const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    menuId: {type: String},
    categoryTitle: { type: String },
    isHidden: { type: Boolean},
    menuItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'MenuItem'
        }
    ]
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;