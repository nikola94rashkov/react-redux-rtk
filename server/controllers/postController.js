const Post = require('../models/Post');
const upload = require('../middleware/uploadMiddleware');

const createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;

        const newPost = new Post({
            title,
            content,
            image: req.file.path,
            author: userId,
        });

        const savedPost = await newPost.save();
        res.status(201).json({
            message: 'Post created successfully',
            post: {
                ...savedPost.toObject(),
                image: imageUrl,
            }
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error: err.message });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const post = await Post.findOne({ _id: id, author: userId });

        if (!post) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        if (req.file) {
            post.image = req.file.path;
        }

        const updatedPost = await post.save();
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const post = await Post.findOneAndDelete({ _id: id, author: userId });

        if (!post) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id).populate('author', 'firstName lastName email');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/${post.image.replace(/\\/g, '/')}`;

        res.status(200).json({
            ...post.toObject(),
            image: imageUrl,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getAllPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .populate('author', 'firstName lastName email')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const totalPosts = await Post.countDocuments();

        const postsWithImageUrl = posts.map((post) => ({
            ...post.toObject(),
            image: `${req.protocol}://${req.get('host')}/${post.image.replace(/\\/g, '/')}`,
        }));

        res.status(200).json({
            posts: postsWithImageUrl,
            totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: parseInt(page),
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getPostsByUserId = async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
        const skip = (page - 1) * limit;

        const posts = await Post.find({ author: userId })
            .populate('author', 'firstName lastName email')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const totalPosts = await Post.countDocuments({ author: userId });

        const postsWithImageUrl = posts.map((post) => ({
            ...post.toObject(),
            image: `${req.protocol}://${req.get('host')}/${post.image.replace(/\\/g, '/')}`,
        }));

        res.status(200).json({
            posts: postsWithImageUrl,
            totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: parseInt(page),
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPostById,
    getAllPosts,
    getPostsByUserId
};