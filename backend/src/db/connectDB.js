import mongoose from "mongoose";
// const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("Connect to DB")
        })
        connection.on('error', (error) => {
            console.log("Something went wrong MongoDB", error)
        })
    }
    catch (error) {
        console.log("Something went wrong", error)
    }

}
export default connectDB;
// module.exports=connectDB