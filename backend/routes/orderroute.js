const express = require('express');
const orderController = require('/backend/controllers/ordercontroller.js');

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);

module.exports = router;