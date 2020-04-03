import React from "react";
import images from "../../images/images";
import ASCIIART from "./ASCIIART";

const HangMan = props => {
  const { code, session } = props;
  const points = session.points;

  //rendering hangman based on current points
  // return <div>{ASCIIART[points /20]}</div>
  return <img src={images[points / 20]} />;
};

export default HangMan;
