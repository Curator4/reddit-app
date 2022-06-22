import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./groupsSlice.js";
import addGroupsReducer from "./addGroupSlice.js";

const store = configureStore({
  reducer: {
    groups: groupsReducer,
    addGroup: addGroupsReducer,
  },
});

export default store;
