const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    dishes: [
        {}
    ],

});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);