const Dish = require("../models/Dish");

const dishes = async () => {
    const dishes = await Dish.find();
    return dishes;
};
const dishById = async id => {
    const dish = await Dish.findById(id);
    return dish;
}
const createDish = async payload => {
    const newDish = await Dish.create(payload);
    return newDish
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

exports.createDish = async (req, res) => {
    try {
        let payload = {
            rName: req.body.rName,
            dName: req.body.dName,
            dPrice: req.body.dPrice
        }
        let dish = await createDish({
            ...payload
        });
        res.status(200).json({
            status: true,
            data: dish,

        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
            message: 'Error creating a new yummy item'
        })
    }
}