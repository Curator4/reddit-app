import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGroup, fetchGroupData } from "../../store/groupsSlice.js";
import { Item, LoadingBox } from "../../components";

import "./items.css";

export const Items = () => {
  const dispatch = useDispatch();
  const groupsSlice = useSelector((state) => state.groups);
  const { currentGroupName, posts, isLoading } = groupsSlice;
  const loadedPosts = useSelector((state) => state.groups.posts !== []);
  const group = useSelector((state) => selectGroup(state, currentGroupName));

  useEffect(() => {
    if (!loadedPosts) {
      console.log("fetching posts");
      dispatch(fetchGroupData(group));
      return;
    }
    dispatch(fetchGroupData(group));
    // eslint-disable-next-line
  }, [currentGroupName]);

  if (isLoading) {
    return (
      <div className="loadingBox-container">
        {group.members.map((subreddit, index) => (
          <LoadingBox subreddit={subreddit} key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="Items_container">
      {posts.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};
export default Items;
