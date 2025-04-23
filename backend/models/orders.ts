import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema0 = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});

const orderSchema = mongoose.model("order", OrderSchema0);
export { orderSchema };
