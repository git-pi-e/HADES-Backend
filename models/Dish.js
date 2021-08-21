const mongoose = require("mongoose");
const dishSchema = new mongoose.Schema({
    dName: {
        type: String,
        required: true,
    },
    rName: {
        type: String,
        required: true,
    },
    dPrice: {
        type: Number,
        required: true,
    },
    dImgUrl: {
        type: String,
        required: true,
    }
},
    {
        timestamps: false,
        collection: 'dishes',
        bufferCommands: false
    }
);

const Dish = mongoose.model("Dish", dishSchema);
module.exports = Dish;