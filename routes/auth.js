const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/signin', signin);
router.put('/cart')

module.exports = router;

