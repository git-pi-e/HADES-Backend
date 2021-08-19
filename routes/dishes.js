const router = require("express").Router();

const dishController = require("../controllers/dishController");

router.get("/", dishController.getDishes);
router.get("/:id", dishController.getDishById);

module.exports = router;