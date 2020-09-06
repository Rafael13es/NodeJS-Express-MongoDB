const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
    res.send('POST');
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

module.exports = router;