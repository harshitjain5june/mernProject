import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();
const mongoURI = `mongodb+srv://harshitjain5june:${process.env.password}@cluster0.nnwus63.mongodb.net/goFood?retryWrites=true&w=majority`

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected");
        const fetchedData = await mongoose.connection.db.collection("food_items");
        const data = await fetchedData.find({}).toArray();
        console.log(data[3].name)
    }
    catch (error) {
        console.error(error);
    }
}

export default mongoDB;

