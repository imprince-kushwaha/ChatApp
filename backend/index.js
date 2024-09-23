// const express = require('express')
// const cors = require('cors')
import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./src/db/connectDB.js";
// require('dotenv').config()
import router from "./src/routes/index.routes.js";
import cookieParser from "cookie-parser";

import {app,server} from './src/socket/index.socket.js'

dotenv.config();

// const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// api end point
app.use('/api',router)

connectDB().then(() => {
    // app.listen(port, () => {
    //     console.log(`Example app listening on port ${port}`)
    // })
    server.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})
.catch((err) => {
    console.log("MONGO DB connection failedd!!!!",err);
});

