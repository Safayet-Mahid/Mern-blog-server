const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            unique: true,
            required: true
        },
        img: { type: String },
        shortBio: { type: String },
        intrests: { type: Array }

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", UserSchema)