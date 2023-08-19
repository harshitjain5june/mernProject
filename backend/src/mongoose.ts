import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();
const mongoURI = `mongodb+srv://harshitjain5june:${process.env.password}@cluster0.nnwus63.mongodb.net/goFood?retryWrites=true&w=majority`

declare const global: {
    food_items: Object[];
    foodCategory: Object[];
};

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected");
        const fetchedItems = await mongoose.connection.db.collection("food_items");
        const fetchedCategory = await mongoose.connection.db.collection("foodCategory");
        const itemsData = await fetchedItems.find({}).toArray();
        const categoryData = await fetchedCategory.find({}).toArray();
        global.food_items = itemsData;
        global.foodCategory = categoryData;
    }
    catch (error) {
        console.error(error);
    }
}

export default mongoDB;

