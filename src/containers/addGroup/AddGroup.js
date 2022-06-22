import React from "react";
import { Subreddit } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { appendGroup } from "../../store/groupsSlice.js";
import {
  setSearchTerm,
  setName,
  setDescription,
  fetchSearchSubreddits,
  toggleDisplay,
  isDuplicate,
  resetAddGroupSlice,
} from "../../store/addGroupSlice.js";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import "./addGroup.css";

const AddGroup = () => {
  const addGroup = useSelector((state) => state.addGroup);
  const groupsSlice = useSelector((state) => state.groups);
  const { groups } = groupsSlice;
  const { searchTerm, subreddits, group, groupMembers, duplicate } = addGroup;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSearchSubreddits(searchTerm));
  };

  const handleClose = () => {
    dispatch(toggleDisplay());
  };

  const handleAddGroup = () => {
    if (groups.some((element) => group.name === element.name)) {
      dispatch(isDuplicate(true));
      return;
    }
    dispatch(appendGroup(group));
    dispatch(toggleDisplay());
    dispatch(isDuplicate(false));
    dispatch(resetAddGroupSlice());
  };

  return (
    <div className="AddGroup">
      <div className="AddGroup_container">
        <h2>Add Group</h2>
        <AiOutlineClose
          className="Addgroup_close_button"
          onClick={handleClose}
        />
        <div className="AddGroup_container_body">
          <div className="AddGroup_container_body_info">
            <h3>Group Information</h3>
            <div className="AddGroup_container_body_info_data">
              <form className="AddGroup_container_body_info_data_form">
                <label>
                  Name:
                  <input
                    type="text"
                    placeholder=" Name"
                    onChange={(e) => dispatch(setName(e.target.value))}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    placeholder="Group description"
                    onChange={(e) => dispatch(setDescription(e.target.value))}
                  />
                </label>
                <label>
                  Private:
                  <input type="checkbox" />
                </label>
              </form>
            </div>
            <div className="AddGroup_container_body_info_subreddits_title">
              <h3>Subreddits in Group</h3>
            </div>
            <div className="AddGroup_container_body_info_subreddits">
              {groupMembers.map((member) => {
                return (
                  <Subreddit subreddit={member} member={true} key={member.id} />
                );
              })}
            </div>
          </div>
          <div className="AddGroup_container_body_search">
            <h3>Search Subreddits</h3>
            <div className="AddGroup_container_body_search_searchfield">
              <IoMdSearch className="AddGroup_container_body_search_img" />
              <div className="AddGroup_container_body_search_input">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder=" Search"
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>
            <div className="AddGroup_container_body_search_subreddits">
              {subreddits.slice(0, 12).map((subreddit) => {
                if (groupMembers.some((member) => member.id === subreddit.id)) {
                  return null;
                }
                return (
                  <Subreddit
                    subreddit={subreddit}
                    member={false}
                    key={subreddit.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <button
          className="AddGroup_container_body_addButton"
          onClick={handleAddGroup}
        >
          Add Group
        </button>
        {duplicate && (
          <div className="AddGroup_failmessage">
            Cannot have duplicate group names
          </div>
        )}
      </div>
    </div>
  );
};
export default AddGroup;
