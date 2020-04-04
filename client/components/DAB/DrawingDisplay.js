import React, { useState, useEffect } from "react";
import GuessForm from "./GuessForm";

const DrawingDisplay = props => {
  const { session, code, uid } = props;
  const { turn, turnTimeStarted } = session;
  const [display, setDisplay] = useState(null);

  const { drawing, nickname, points, targetWord } = session.players[turn];

  useEffect(() => {
    //retrieving current turn's drawing
    setDisplay(drawing);
  }, []);

  //add timer
  return (
    <div>
      <h2>Time to Guess!</h2>
      <img
        src={display}
        style={{
          display: "block",
          margin: "0 auto",
          border: "1px solid black"
        }}
      />
      <GuessForm
        session={session}
        uid={uid}
        code={code}
        drawer={nickname}
        drawerID={turn}
      />
    </div>
  );
};

export default DrawingDisplay;
