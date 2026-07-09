import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    firebaseUid: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    avatar: {
        type: String,
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;