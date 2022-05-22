import React from "react";
import { useSelector } from "react-redux";
import { Group } from '../../components';
import "./groups.css";

export const Groups = () => {
  const groups = useSelector((state) => state.groups.groups);
  return (
    <div className="Groups_container">
      {groups.map((group) => (
        <Group key={group.name} group={group} />
      ))}
    </div>
  );
};
export default Groups;
