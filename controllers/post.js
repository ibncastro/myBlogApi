const Post = require("../models/Posts")


const create = async (req, res) => {
    try {
        const post = new Post(req.body)
        await post.save();
        return res.status(200).json({ message: "Post has been added successfully" })
    } catch (err) {
        return res.status(400).json({ error: "Could not add new post, try again " })
    }
}

const list = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(400).json({ error: "Could not fetch posts" })
    }
}

const PostByID = async (req, res, next, id) => {
    try {
        const post = await Post.findById(id)
        req.singlePost = post;
        if (!post) {
            res.status(400).json({ error: "Could not find Post" })
            
        }
        next()
    } catch (err) {
        res.json({ error: "Could not retireve post" })
    }
}

const read = (req, res) => {
    res.json(req.singlePost)
}

const remove = async (req, res, next) => {

    try {
        let post = req.singlePost;
        let deletedPost = await post.deleteOne({ _id: post.id });
        res.json(deletedPost)
    } catch (err) {
        res.status(400).json({ error: "Could not remove Post" })
    }
}

const update = async (req, res) => {

    try {
        let post = req.singlePost;

        const newP = {
            title: req.body.title,
            author: req.body.author,
            body: req.body.body
        }

        await Post.findOneAndUpdate({ _id: post.id }, newP)
        res.json(newP)
    } catch (err) {
        res.status(400).json({ error: "Could not update Post" })
    }
}


module.exports = { create, read, list, PostByID, remove, update }