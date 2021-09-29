import mongoose from 'mongoose';

const postContenSchema = mongoose.Schema({
    creator: String,
    email: String,
    postContent: String,
    createdAt: {
        type: Date,
        default: new Date()
    },

    comments: {type: [String], default:[]}
});

const PostContent = mongoose.model('PostContent', postContenSchema);

export default PostContent;