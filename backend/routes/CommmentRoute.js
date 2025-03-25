onst express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticateUser } = require('../middleware/auth');

router.post('/', authenticateUser, commentController.createComment);
router.get('/product/:productId', commentController.getProductComments);
router.delete('/:id', authenticateUser, commentController.deleteComment);
router.put('/:id', authenticateUser, commentController.updateComment);

module.exports = router;
