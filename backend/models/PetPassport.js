import mongoose from "mongoose";

const petPassSchema = new mongoose.Schema({
        birth: {
            type: Date,
            required: true,
        },
        feed:{
            type: String,
            required: true,
        },
        gender:{
            type: String,
            required: true,
        },
        coloration:{
            type: String,
            required: true,
        },
        weight:{
            type: Number,
            required: true,
        },
        sterilization:{
            type: Boolean,
            required: true,
        },
        account:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true,
        },
        photo: String,
    });

export default mongoose.model('petPassport', petPassSchema);