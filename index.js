const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRoute = require("./routes/user")

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


app.use("/api/user", userRoute)




app.get("/", (req, res) => {
    res.send("testing")
})

app.listen(port, () => {
    console.log("Backend is connected");
})