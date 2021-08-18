const mongoose = require("mongoose");
const dishSchema = new mongoose.Schema({
    dName: {
        type: String,
        required: [true, "Please include the product name"],
    },
    dPrice: {
        type: Number,
        required: [true, "Please include the product price"],
    },
    rName: {
        type: String,
        required: [true, "Please include the restaurant name"],
    }
});

const Dish = mongoose.model("Dish", dishSchema);
module.exports = Dish;