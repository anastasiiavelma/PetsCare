import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    symptoms:{
        type: String,
        required: true,
    },
    treatment:{
        type: String,
        required: true,
    },

});

export default mongoose.model('Diagnosis', diagnosisSchema);