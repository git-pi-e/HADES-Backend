const Dish = require("../models/Dish");

const dishes = async () => {
    const dish = await Dish.find();
    return dish;
};
const dishById = async id => {
    const dish = await Dish.findById(id);
    return dish;
}

exports.getDishes = async (req, res) => {
    try {
        let dishes = await dishes();
        res.status(200).json({
            status: true,
            data: dishes,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err.message,
            status: false,
            message: 'Error getting all those yummy items'
        })
    }
}

exports.getDishById = async (req, res) => {
    try {
        let id = req.params.id
        let dishDetails = await dishById(id);
        res.status(200).json({
            status: true,
            data: dishDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err.message, message: 'Error getting that yummy particular item by id'
        })
    }
}