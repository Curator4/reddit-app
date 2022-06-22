import React from "react";
import { Groups } from "../../containers";
import { toggleDisplay } from "../../store/addGroupSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { FaReddit } from "react-icons/fa";
import { IoIosAddCircle, IoIosRemoveCircle, IoMdSearch } from "react-icons/io";
import "./navbar.css";

const Navbar = () => {
  const selectDisplay = useSelector((state) => state.addGroup.display);
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(toggleDisplay());
  };
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <FaReddit className="navbar-logo-icon" />
          <p>
            Reddit<span>Groups</span>
          </p>
        </div>
        <div className="navbar-groups">
          <div className="navbar-groups-add">
            {selectDisplay ? (
              <IoIosRemoveCircle
                className="navbar-groups-remove-icon"
                onClick={handleAdd}
              />
            ) : (
              <IoIosAddCircle
                className="navbar-groups-add-icon"
                onClick={handleAdd}
              />
            )}
          </div>
          <div className="navbar-groups-list">
            <Groups />
          </div>
        </div>
        <div className="navbar-menus">
          <div className="navbar-menus-search">
            <IoMdSearch className="navbar-menus-search-icon" />
            <div className="navbar-menus-search-input">
              <input type="text" placeholder=" Search" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
