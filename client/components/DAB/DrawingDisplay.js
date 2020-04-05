import React, { useState, useEffect } from "react";
import GuessForm from "./GuessForm";

const DrawingDisplay = props => {
  const { session, code, uid } = props;
  const { turn, turnTimeStarted } = session;
  const [display, setDisplay] = useState(null);
  const drawerNick = session.players[turn].nickname;

  const { drawing } = session.players[turn];

  useEffect(() => {
    //retrieving current turn's drawing
    setDisplay(drawing);
  }, []);

  //add timer
  return (
    <div>
      <h2>Look at the masterpiece by {drawerNick}!</h2>
      <img
        src={display}
        style={{
          display: "block",
          margin: "0 auto",
          border: "1px solid black"
        }}
      />
      <GuessForm session={session} uid={uid} code={code} drawerId={turn} />
    </div>
  );
};

export default DrawingDisplay;
