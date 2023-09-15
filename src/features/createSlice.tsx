import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    cart: [] as any
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