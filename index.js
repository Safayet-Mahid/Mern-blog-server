const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

dotenv.config()


mongoose.connect(process.env.MONOGOURL)
    .then(() => {
        console.log("MongoDB is connected")
    })
    .catch(err => console.log(err))

// user 
app.use("/api/user", userRoute)


// blog 
app.use("/api/blogs", blogRoute)


app.get("/", (req, res) => {
    res.send("testing")
})



app.listen(port, () => {
    console.log("Backend is connected");
})