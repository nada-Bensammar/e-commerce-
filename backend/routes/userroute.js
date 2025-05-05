import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js'

import { createUser, getAllUsers,getUserById ,login ,deleteUser} from '../controllers/usercontroller.js' ;

const router = express.Router();
router.get('/', protect, admin, getAllUsers);
router.post('/createUser', createUser);
router.get('/:id',protect, getUserById);
router.delete('/:id', protect, admin,deleteUser);
router.post('/login', login);

export default router;