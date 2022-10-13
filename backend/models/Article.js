import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    textInfo:{
        type: String,
        required: true,
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
        photoUrl: String,
}, {
        timestamps: true,
    },
);

export default mongoose.model('Article', articleSchema);