require('dotenv').config()
const mongoose = require('mongoose')

const config = require('config');




const mongoURI = process.env.mongoURI


//this will return us promise

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true
        })


        console.log('MongoDB connected...');

    } catch (err) {
        console.error(err.message);

        //Exit process with failuer
        process.exit(1);
    }
}

module.exports = connectDB;