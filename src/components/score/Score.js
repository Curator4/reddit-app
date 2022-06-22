import React from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import "./score.css";

const Score = ({ item }) => {
  return (
    <div className="score">
      <div className="score-upvote">
        <BiUpvote />
      </div>
      <div className="score-tally">{item.score}</div>
      <div className="score-downvote">
        <BiDownvote />
      </div>
    </div>
  );
};

export default Score;
