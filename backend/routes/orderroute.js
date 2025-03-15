const express = require('express');
const orderController = require('/backend/controllers/ordercontroller.js');
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/', orderController.createOrder, authMiddleware);
router.get('/:id', orderController.getOrderById);

module.exports = router;