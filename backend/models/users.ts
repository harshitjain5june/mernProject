import mongoose from "mongoose";
import { string } from "yargs";

const { Schema } = mongoose;

const userSchema0 = new Schema({

    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})
const userSchema = mongoose.model('user', userSchema0);

export { userSchema }