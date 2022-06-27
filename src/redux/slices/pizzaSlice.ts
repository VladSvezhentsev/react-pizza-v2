import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Pizza = {
   id: number;
   name: string;
   price: number;
   imageUrl: string;
   types: number[];
   sizes: number[];
};

interface PizzaSliceState {
   items: Pizza[];
   status: "loading" | "success" | "error";
}

const initialState: PizzaSliceState = {
   items: [],
   status: "loading",
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
   "pizza/fetchPizzasStatus",
   async (params) => {
      const { category, sortBy } = params;
      const { data } = await axios.get<Pizza[]>(
         `https://6294e56963b5d108c1968f1a.mockapi.io/items?${category}&sortBy=${sortBy}&order=desc`
      );

      return data;
   }
);

const pizzaSlice = createSlice({
   name: "pizza",
   initialState,
   reducers: {
      setItems(state, action: PayloadAction<Pizza[]>) {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state) => {
         state.items = [];
         state.status = "loading";
      });
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.items = action.payload;
         state.status = "success";
      });
      builder.addCase(fetchPizzas.rejected, (state) => {
         state.status = "error";
         state.items = [];
      });
   },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
