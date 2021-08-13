const mongoose = require("mongoose");
const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please include the product name"],
    },
    price: {
        type: Number,
        required: [true, "Please include the product price"],
    },
    restaurant: {
        type: String,
        required: [true, "Please include the restaurant name"],
    }
});

const Dish = mongoose.model("Dish", dishSchema);
module.exports = Dish;