import React from "react";
import "./item.css";

const Item = ({ item }) => {
  return (
    <div className="item">
      <div className="item-container-header">{item.title}</div>
      <div className="item-container-body">
        {item.is_self && <p>{item.selftext}</p>}
        <img src={item.url} alt="" />
      </div>
    </div>
  );
};

export default Item;
