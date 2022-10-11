import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    information:{
        type: String,
        required: true,
    },
    photo: String,
});

export default mongoose.model('Article', articleSchema);