const express = require("express");
const router = express.Router();

//lets assume we want the person creating the post to be authenticated
//before he can post, we import the auth middle ware we created
const auth = require("../../middleware/auth");
const Post = require("../../models/post");

//by including auth before the callback, we ensure that the routes
//are private

//creates Post
//because of the auth, post router is now private
router.post("/", auth, (req, res) => {
    const { title, detail } = req.body;
    const newPost = new Post({
        title,
        detail,
    });
    newPost
        .save()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});

//create a comment inside post

router.post("/comment/:title", async (req, res) => {
    console.log(req.params.title);
    const PostComment = await Post.findOne({ title: req.params.title });

    PostComment.comments.push(req.body);
    PostComment.save()
        .then((data) => res.json(data))
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get("/", (req, res) => {
    Post.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(404).json(err));
});

//because of the auth, delete is now private
router.delete("/:id", auth, (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then((data) => res.status(200).json({ success: true }))
        .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
