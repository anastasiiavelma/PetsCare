import mongoose from 'mongoose'

const QuestionType = {
    questionTest: String,
    answers: [{
        isRight: Boolean,
        text: String,
    }]
}

const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    questions: {
        type: [QuestionType],
        required: true,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        requires: true,
    },
}, { timestamps: true })

export default mongoose.model('Test', TestSchema)