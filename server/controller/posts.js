import PostContent from "../models/postContent.js";
import mongoose from 'mongoose';

export const getAllPosts = async (req, res) => {

    // const {page} = req.query;

    try {
        // const LIMIT = 8;
        // const startIndex = (Number(page) - 1) * LIMIT;

        // const total = await PostContent.countDocuments({});

        const posts = await PostContent.find();
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(404).send({message: error.message});
    }
}

export const getSearchPost = async (req, res) => {
    const {searchQuery} = req.query;
   
    try {
        const creator = new RegExp(searchQuery, 'i');
        const email = new RegExp(searchQuery, 'i');
        const postContent = new RegExp(searchQuery, 'i');

        const posts = await PostContent.find({$or: [{creator}, {email}, {postContent}]});

        res.json({data: posts});
    } catch (error) {
        res.status(404).send({message: error.message});
    }
}

export const createPosts = async (req, res) => {
    const posts = req.body;

    const newPosts = new PostContent(posts);

    try {
       await newPosts.save();
       
       res.status(200).send(newPosts);

    } catch (error) {
        res.status(404).send({message: error.message});
    }
}


export const deletePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }

    await PostContent.findByIdAndRemove(id);

    res.json({message: 'Successfully deleted the post'});
}

export const commentPost = async (req, res) => {
    const {id} = req.params;
    const {value} = req.body;

    const post = await PostContent.findById(id);
    post.comments.push(value);

    const updatedPost = await PostContent.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);
}