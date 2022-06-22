import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentGroupName } from "../../store/groupsSlice.js";
import "./group.css";

const Group = ({ group }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(setCurrentGroupName(group.name));
  };
  return (
    <div className="Group" onClick={handleClick}>
      <h3>{group.name}</h3>
    </div>
  );
};
export default Group;
