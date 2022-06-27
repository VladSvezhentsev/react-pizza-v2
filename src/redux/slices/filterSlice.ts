import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Sort = {
   name: string;
   sortProperty: "rating" | "price" | "title";
};

interface FilterSliceState {
   searchValue: string;
   categoryId: number;
   sort: Sort;
}

const initialState: FilterSliceState = {
   searchValue: "",
   categoryId: 0,
   sort: {
      name: "popularity",
      sortProperty: "rating",
   },
};

const filterSlice = createSlice({
   name: "filters",
   initialState,
   reducers: {
      setCategoryId(state, action: PayloadAction<number>) {
         state.categoryId = action.payload;
      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      },
      setSort(state, action) {
         state.sort = action.payload;
      },
   },
});

export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
