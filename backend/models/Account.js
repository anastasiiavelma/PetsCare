import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
        unique: true,
    },
    name:{
        type: String,
    },
    passwordHash:{
        type: String,
        required: true,
    },
    role:{                  // ADMIN OR USER
        type: String,
    },
}, {
    timestamps: true,
    },
);

export default mongoose.model('Account', AccountSchema);

