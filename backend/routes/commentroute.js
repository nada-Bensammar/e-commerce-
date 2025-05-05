import express from 'express';

import {
  createComment,
  getComments,
  updateComment,
  deleteComment
} from '../controllers/commentcontroller.js';



const router = express.Router({ mergeParams: true });


router.get('/', getComments);


router.post('/',createComment)
  

router.put('/:id', updateComment);



export default router;