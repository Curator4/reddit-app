import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Score } from "../../components";
import { Waypoint } from "react-waypoint";
import { CSSTransition } from "react-transition-group";

import "./item.css";

const Item = ({ item }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleEnter = () => {
    setIsVisible(true);
  };

  const handleLeave = () => {
    setIsVisible(false);
  };

  return (
    <CSSTransition in={isVisible} timeout={500} classNames="fade">
      <div className="item">
        <div className="item-container-header">
          <div className="item-header-score">
            <Score item={item} />
          </div>
          <p className="item-header-title">{item.title}</p>
        </div>
        <div className="item-container-body">
          <Waypoint onEnter={handleEnter} onLeave={handleLeave}>
            <div className="item-container-body-video">
              <img src={item.url} alt="" />
              {item.is_video && (
                <ReactPlayer
                  className="item-video"
                  url={item.media.reddit_video.fallback_url}
                  playing={isVisible}
                  controls={true}
                />
              )}
              <p className="item-body-source">{item.subreddit_name_prefixed}</p>
            </div>
          </Waypoint>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Item;
