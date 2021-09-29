import express from 'express';
import { getSearchPost, getAllPosts, createPosts, deletePost, commentPost } from '../controller/posts.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/search', getSearchPost);
router.post('/', createPosts);
router.post('/:id/commentPost', commentPost);
router.delete('/:id', deletePost);

export default router;
