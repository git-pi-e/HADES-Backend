const express = require('express');
const router = express.Router();

const { signup, signin, getCart } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getcart/:id', getCart)

module.exports = router;

