import { configureStore } from "@reduxjs/toolkit";
import  cartReducer  from "../features/createSlice";
export const store = configureStore({
  reducer: {cartData: cartReducer},
});

export type RootState = ReturnType<typeof store.getState>;