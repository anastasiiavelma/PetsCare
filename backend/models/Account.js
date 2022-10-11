import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
        unique: true,
    },
    passwordHash:{
        type: String,
        required: true,
    },

}, {
    timestamps: true,
    },
);

export default mongoose.model('Account', AccountSchema);

