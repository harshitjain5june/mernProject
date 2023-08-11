import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();
const mongoURI = `mongodb+srv://harshitjain5june:${process.env.password}@cluster0.nnwus63.mongodb.net/?retryWrites=true&w=majority`

const mongoDB = async () => {
    try {
       await mongoose.connect(mongoURI);
       console.log("connected")
    }
    catch (error) {
        console.error(error);
    }
}

export default mongoDB;

