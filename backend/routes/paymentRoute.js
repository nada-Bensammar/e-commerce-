const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-payment-intent', authMiddleware, paymentController.createPaymentIntent);

module.exports = router;