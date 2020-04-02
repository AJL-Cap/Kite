import React from "react";
import images from "../../images/images";

const HangMan = props => {
  const { code, session } = props;
  const points = session.points;

  //rendering hangman based on current points
  return <img src={images[points / 20]} />;
};

export default HangMan;
