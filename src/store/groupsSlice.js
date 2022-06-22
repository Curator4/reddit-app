import { createSlice } from "@reduxjs/toolkit";
import { getSubredditPosts } from "../api/redditapi.js";

const options = {
  name: "groups",
  initialState: {
    groups: [
      {
        name: "Home",
        description: "Home group",
        members: [
          {
            name: "/r/Home",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
        ],
      },
      {
        name: "News",
        description: "News group",
        members: [
          {
            name: "/r/News",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/worldnews",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/politics",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
        ],
      },
      {
        name: "Gaming",
        description: "Gaming group",
        members: [
          {
            name: "/r/gaming",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/games",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/pcgaming",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/starcraft",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/eu4",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/hoi4",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/crusaderkings",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/classicwow",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/Eldenring",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/satisfactorygame",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/mmorpg",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
        ],
      },
      {
        name: "Funny",
        description: "Funny group",
        members: [
          {
            name: "/r/funny",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/unexpected",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/mademysmile",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/pics",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
          {
            name: "/r/mildlyinfuriating",
            icon: "https://i.imgur.com/ZQQZQZQ.png",
            isLoading: false,
          },
        ],
      },
    ],
    currentGroupName: "Home",
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
    startGetGroupData: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getGroupDataSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getGroupDataFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    setCurrentGroupName: (state, action) => {
      state.currentGroupName = action.payload;
    },
    toggleMembersLoading: (state) => {
      state.groups
        .find((group) => group.name === state.currentGroupName)
        .members.map((member) => (member.isLoading = !member.isLoading));
    },
    memberLoadingSuccess: (state, action) => {
      state.groups
        .find((group) => group.name === state.currentGroupName)
        .members.forEach((member) => {
          if (member.name === action.payload) {
            member.isLoading = false;
          }
        });
    },
  },
};

const groupsSlice = createSlice(options);

export const {
  appendGroup,
  removeGroup,
  startGetGroupData,
  getGroupDataSuccess,
  getGroupDataFailure,
  setCurrentGroupName,
  toggleMembersLoading,
  memberLoadingSuccess,
} = groupsSlice.actions;

export const fetchGroupData = (group) => async (dispatch) => {
  dispatch(toggleMembersLoading());
  dispatch(startGetGroupData());
  let data = [];
  try {
    for (const subreddit of group.members) {
      data = data.concat(await getSubredditPosts(subreddit.name));
      console.log(`Loaded data from ${subreddit.name}`);
      dispatch(memberLoadingSuccess(subreddit.name));
    }
    data.sort((a, b) => b.score - a.score);
    dispatch(getGroupDataSuccess(data));
  } catch (error) {
    dispatch(getGroupDataFailure());
    console.log(error);
  }
};

export const selectGroup = (state, name) => {
  return state.groups.groups.find((group) => group.name === name);
};
export const selectMember = (state, name) => {
  return state.groups.groups
    .find((group) => group.name === state.groups.currentGroupName)
    .members.find((member) => member.name === name);
};
export default groupsSlice.reducer;
