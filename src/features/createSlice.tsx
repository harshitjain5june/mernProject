import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  name: string;
  quantity: number;
  size: string;
}

const initialState = { 
    cart: [] as CartItem[]
 };
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   showCart: (state) =>{
    return state;
   },
   addToCart: (state, action) =>{
    state.cart.push(action.payload)
   }
  },
});

export const { showCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;