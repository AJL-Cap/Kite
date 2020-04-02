import React from "react";
import fire from "../../fire";
import ASCIIART from "./ASCIIART";

const HangMan = props => {
  const { code, session } = props;
  const points = session.points;

  //rendering hangman based on current points
  return <div> {ASCIIART[points / 20]} </div>;
};

export default HangMan;
