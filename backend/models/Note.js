import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    photo: String,
});

export default mongoose.model('Note', noteSchema);