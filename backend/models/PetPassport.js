import mongoose from "mongoose";
import {Double, Int32, ObjectId} from "mongodb";

const petPassSchema = new mongoose.Schema({
        birth: {
            type: Date,
            required: true,
        },
        name:{
            type: String,
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
            type: Double,
            required: true,
        },
        sterilization:{
            type: Boolean,
            required: true,
        },
        accountId:{
            type: ObjectId,
            ref: 'Account',
            required: true,
            unique: true,
        },
        diagnosisId:{
            type: ObjectId,
            ref: 'Diagnosis',
            required: true,
        },
        photo: String,
    });

export default mongoose.model('petPassport', petPassSchema);