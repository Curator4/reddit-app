import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGroup, fetchSubredditData } from "../../store/groupsSlice.js";
import { Item } from "../../components";
import "./items.css";

export const Items = () => {
  const dispatch = useDispatch();
  const loadedPosts = useSelector((state) => state.groups.posts !== []);
  const [groupId, setGroupId] = useState("/r/Home");
  const group = useSelector((state) => selectGroup(state, groupId));
  const posts = useSelector((state) => state.groups.posts);

  useEffect(() => {
    if (loadedPosts) {
        console.log("fetching posts");
      dispatch(fetchSubredditData(groupId));
      return;
    }
  }, [dispatch, loadedPosts, groupId]);

  return (
    <div className="Items_container">
      {posts.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
export default Items;
