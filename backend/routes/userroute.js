const express = require('express');
const userController = require('/backend/controllers/usercontroller.js');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);

module.exports = router;