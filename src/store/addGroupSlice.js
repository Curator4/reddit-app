import { createSlice } from "@reduxjs/toolkit";
import { getSearchedSubreddits } from "../api/redditapi";

const options = {
  name: "addGroup",
  initialState: {
    group: {
      name: "",
      description: "",
      members: [],
    },
    searchTerm: "",
    groupMembers: [],
    subreddits: [],
    error: false,
    isLoading: false,
    display: false,
    duplicate: false,
  },
  reducers: {
    isDuplicate: (state, action) => {
      state.duplicate = action.payload;
    },
    startGetSubreddits: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getSubredditsSuccess: (state, action) => {
      state.isLoading = false;
      state.subreddits = action.payload;
      console.log("loaded subreddits");
    },
    getSubredditsFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    setName: (state, action) => {
      state.group.name = action.payload;
    },
    setDescription: (state, action) => {
      state.group.description = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setMembers: (state, action) => (state.group.members = action.payload),
    addMember: (state, action) => {
      state.group.members.push({
        name: action.payload.url,
        icon: action.payload.icon_img,
        isLoading: false,
      });
      state.groupMembers.push(action.payload);
    },
    removeMember: (state, action) => {
      state.group.members = state.group.members.filter(
        (subreddit) => subreddit.id !== action.payload.id
      );
      state.groupMembers = state.groupMembers.filter(
        (subreddit) => subreddit.id !== action.payload.id
      );
    },
    toggleDisplay: (state) => {
      state.display = !state.display;
    },
    resetAddGroupSlice: (state) => {
      state.group = {
        name: "",
        description: "",
        members: [],
      };
      state.searchTerm = "";
      state.groupMembers = [];
      state.subreddits = [];
    },
  },
};
const addGroupSlice = createSlice(options);

export const {
  startGetSubreddits,
  getSubredditsSuccess,
  getSubredditsFailure,
  setName,
  setDescription,
  setSearchTerm,
  addMember,
  removeMember,
  setMembers,
  toggleDisplay,
  isDuplicate,
  resetAddGroupSlice,
} = addGroupSlice.actions;

// Thunk to update searched subreddits
export const fetchSearchSubreddits = (searchTerm) => async (dispatch) => {
  try {
    dispatch(startGetSubreddits());
    const subreddits = await getSearchedSubreddits(searchTerm);
    dispatch(getSubredditsSuccess(subreddits));
  } catch (error) {
    dispatch(getSubredditsFailure());
    console.log(error);
  }
};

export const selectDisplay = (state) => state.addGroup.display;
export const selectMembers = (state) => state.addGroup.group.members;
export const selectSubreddits = (state) => state.addGroup.subreddits;
export const selectSearchTerm = (state) => state.addGroup.searchTerm;
export default addGroupSlice.reducer;
