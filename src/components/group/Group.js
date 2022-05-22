import React from "react";
import "./group.css";

const Group = ({ group }) => {
  return (
    <div className="Group">
      <h3>{group.name}</h3>
    </div>
  );
};
export default Group;
