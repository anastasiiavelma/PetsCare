import mongoose from "mongoose";
import {ObjectId} from "mongodb";

const QuestionType = {
    questionName: String,
    answers: [{
        isRight: Boolean,
        text: String,
    }],
}
const ResultType = {
    percent: {
        type: Number,
        required: true,
    },
    diagnosisId: {
        type: ObjectId,
        ref: 'Diagnosis',
    },
}

const testSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    information:{
        type: String,
        required: true,
    },
    questions: QuestionType,

});

export default mongoose.model('Test', testSchema);