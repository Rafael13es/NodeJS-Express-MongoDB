const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res) => {
    try {
        const getPost = await Post.find();
        res.json(getPost);
    } catch (err) {
        res.json(err);
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const postCreate = await post.save()
        res.json(postCreate);
    } catch (err) {
        res.json(err);
    }
});

//specific post
//5f5d54fd7485301460919bb9
router.get('/:postId', async (req, res) => {
    
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } } 
        );
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//delete post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;