const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({

    author: { type: String, required: true },
    category: { type: Array, required: true },
    image: { type: String },
    title: { type: String, required: true },
    readingTime: { type: String },
    content: { type: String }


},
    {
        timestamps: true
    }
)


module.exports = mongoose.model("Blog", BlogSchema)
