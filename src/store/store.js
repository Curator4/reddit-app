import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./groupsSlice.js";
import itemsReducer from "./itemsSlice.js";
import addGroupsReducer from "./addGroupSlice.js";

const store = configureStore({
  reducer: {
    groups: groupsReducer,
    items: itemsReducer,
    addGroup: addGroupsReducer,
  },
});

export default store;
