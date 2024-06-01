import React, { useReducer, createContext } from "react";
import Card from "./Card";
type Action =
  | {
      type: "ADD";
      name: string;
      quantity: number;
      size: string;
    }
  | {
      type: "REMOVE";
      name: string;
      quantity: number;
      size: string;
    };

type State = {
  name: string;
  quantity: number;
  size: string;
};

const initialState: State[] = [];

export const CartDispatch = createContext<React.Dispatch<Action>>(() => {});
export const CartState = createContext<State[]>(initialState);

const reducer = (state: State[], action: Action) => {
  switch (action.type) {
    case "ADD":
      console.log("add");
      state.push({
        name: action.name,
        quantity: action.quantity,
        size: action.size,
      });
      return state;
    case "REMOVE":
      return state;

    default:
      console.log("default");
      return state;
  }
};

export default function CartContext() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartState.Provider value={state}>
      <CartDispatch.Provider value={dispatch}></CartDispatch.Provider>
    </CartState.Provider>
  );
}
