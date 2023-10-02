import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: string,
  name: string;
  quantity: number;
  size: string;
  price: number
}

const initialState = {
  cart: [] as CartItem[]
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    showCart: (state) => {
      return state;
    },
    addToCart: (state, action) => {
      let find = state.cart.findIndex((item) => (item.id === action.payload.id && item.size === action.payload.size))
      if (find >= 0) {
        state.cart[find].quantity = state.cart[find].quantity + action.payload.quantity
        state.cart[find].price = state.cart[find].price + action.payload.price
      }
      else
        state.cart.push(action.payload)
    },
    removeFromCart: (state, action) => {
      const itemQuantity = state.cart[action.payload.id].quantity
      const itemPrice = state.cart[action.payload.id].price
      if (itemQuantity > 1) {
        state.cart[action.payload.id].quantity = itemQuantity - 1
        state.cart[action.payload.id].price = itemPrice - (itemPrice/itemQuantity)
      }
      else {
        state.cart.splice(action.payload.id, 1)
      }
    },
    emptyCart : (state) => {
      state.cart = []
    }
  },
});

export const { showCart, addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;