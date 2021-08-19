const router = require("express").Router();

const dishController = require("../controllers/dishController");

router.get("/", dishController.getDishes);
router.get("/:id", dishController.getDishById);
router.post("/", dishController.createDish);

module.exports = router;