import React from "react";
import fire from "../../fire";
import ASCIIART from "./ASCIIART";

const HangMan = props => {
  const { code, session } = props;
  const points = session.points;

  if (points === 0) {
    return <div> {ASCIIART[0]} </div>;
  } else {
    return <div> {ASCIIART[points / 20]} </div>;
  }
};

export default HangMan;
