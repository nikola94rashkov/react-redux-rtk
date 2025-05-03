const express = require('express');

const { isAuthenticated } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const {
    createPost,
    updatePost,
    deletePost,
    getPostById,
    getAllPosts,
    getPostsByUserId
} = require('../controllers/postController');

const router = express.Router();

router.post('/', isAuthenticated, upload.single('image'), createPost);
router.put('/:id', isAuthenticated, upload.single('image'), updatePost);
router.delete('/:id', isAuthenticated, deletePost);

router.get('/:id', getPostById);
router.get('/', getAllPosts);

router.get('/user/:userId', getPostsByUserId);

module.exports = router;