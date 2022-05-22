import { createSlice } from "@reduxjs/toolkit";
import { getSubredditPosts } from "../api/redditapi.js";

const options = {
  name: "groups",
  initialState: {
    groups: [
      {
        id: 0,
        name: "Home",
        description: "Home group",
        members: ["/r/Home"],
      },
    ],
    isLoading: false,
    error: false,
    posts: [],
  },
  reducers: {
    appendGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action) =>
      state.groups.filter((group) => group.id !== action.payload.id),
    startGetSubredditData: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getSubredditDataSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      console.log("loaded posts");
    },
    getSubredditDataFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
};

const groupsSlice = createSlice(options);

export const {
  appendGroup,
  removeGroup,
  startGetSubredditData,
  getSubredditDataSuccess,
  getSubredditDataFailure,
} = groupsSlice.actions;

export const fetchSubredditData = (subreddit) => async (dispatch) => {
  dispatch(startGetSubredditData());
  try {
    const data = await getSubredditPosts(subreddit);
    dispatch(getSubredditDataSuccess(data));
  } catch (error) {
    dispatch(getSubredditDataFailure());
    console.log(error);
  }
};

export const selectGroup = (state, name) => {
  return state.groups.groups.find((group) => group.name === name);
}
export default groupsSlice.reducer;
