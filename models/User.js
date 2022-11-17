const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true

        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
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