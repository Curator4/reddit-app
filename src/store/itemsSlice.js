import { createSlice } from "@reduxjs/toolkit";
import { selectGroup } from "./groupsSlice";

const options = {
  name: "items",
  initialState: {
  },
  reducers: {
  },
};

const itemsSlice = createSlice(options);
export const selectItems = (state) => state.items;
export default itemsSlice.reducer;
