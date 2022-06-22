import React from "react";
import { useDispatch } from "react-redux";
import { addMember, removeMember } from "../../store/addGroupSlice.js";
import "./subreddit.css";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

const Subreddit = ({ subreddit, member }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addMember(subreddit));
    console.log("added");
  };

  const handleRemove = () => {
    dispatch(removeMember(subreddit));
    console.log("removed");
  };

  return (
    <div className="Subreddit">
      {member ? (
        <IoIosRemove className="Subreddit_remove" onClick={handleRemove} />
      ) : (
        <IoIosAdd className="Subreddit_add" onClick={handleAdd} />
      )}
      <img src={subreddit.icon_img} alt="logo" />
      <h3>{subreddit.display_name}</h3>
    </div>
  );
};
export default Subreddit;
