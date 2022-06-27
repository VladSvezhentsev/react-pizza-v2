import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";

export type CartItem = {
   id: number;
   name: string;
   price: number;
   imageUrl: string;
   type: string;
   size: number;
   count: number;
};

interface CartSliceState {
   items: CartItem[];
   totalPrice: number;
}

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
   items,
   totalPrice,
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addPizza(state, action) {
         const findItem = state.items.find(
            (obj) => obj.id === action.payload.id
         );
         if (findItem) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }

         const price = calcTotalPrice(state.items).toFixed(2);
         state.totalPrice = Number(price);
      },
      minusPizza(state, action: PayloadAction<number>) {
         const findItem = state.items.find((obj) => obj.id === action.payload);
         if (findItem) {
            findItem.count--;
         }

         const price = calcTotalPrice(state.items).toFixed(2);
         state.totalPrice = Number(price);
      },
      removePizza(state, action: PayloadAction<number>) {
         state.items = state.items.filter((obj) => obj.id !== action.payload);

         const price = calcTotalPrice(state.items).toFixed(2);
         state.totalPrice = Number(price);
      },
      clearPizzas(state) {
         state.items = [];
         state.totalPrice = 0;
      },
   },
});

export const { addPizza, removePizza, minusPizza, clearPizzas } =
   cartSlice.actions;

export default cartSlice.reducer;
