const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const userRoute = require('./router/user')
const authRoute = require('./router/auth')

const app = express()
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("da ket noi mongoose");
    } catch (err) {
        console.log(err.message)
        console.log("ket noi khong thanh cong");
		process.exit(1)
    }
}
connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// router
app.use('/v1/user', userRoute)
app.use('/v1/auth', authRoute)

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('đã chạy');
})