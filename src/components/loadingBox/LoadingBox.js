import React from "react";
import { useSelector } from "react-redux";
import AnimatedCheckmark, { MODES } from "react-animated-checkmark";
import { selectMember } from "../../store/groupsSlice.js";
import "./loadingBox.css";

export const LoadingBox = ({ subreddit }) => {
  const member = useSelector((state) => selectMember(state, subreddit.name));
  const { isLoading } = member;
  return (
    <div className="LoadingBox">
      <div className="LoadingBox-subreddit">
        <div className="LoadingBox-subreddit-title">
          <h3>{subreddit.name}</h3>
        </div>
      </div>

      <div className="LoadingBox-animation">
        <div className="LoadingBox-animation-checkmark">
          <AnimatedCheckmark
            mode={isLoading ? MODES.LOADING : MODES.SUCCESS}
            baseColor="#f9f6ee"
            successColor="#336699"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingBox;
