import React, { useState, useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import GuessForm from "./GuessForm";
import DisplayResults from "./DisplayResults";
import Timer from "../Game/Timer";
import fire from "../../fire";
const db = fire.database();

const DrawingDisplay = props => {
  const { session, code, uid, targetWord } = props;
  const { turn, turnTimeStarted } = session;
  let drawerNick = "";
  if (turn) {
    drawerNick = session.players[turn].nickname;
  }
  const [turnTime, loading, error] = useObjectVal(
    db.ref(`gameSessions/${code}/turnTimeStarted`)
  );
  if (loading) return "";
  if (error) return "error";

  console.log("turn from session in DD!!!!", turn);

  const numPlayers = Object.keys(session.players).length;
  let timeForRound = 10 + numPlayers * 10;

  return (
    <div>
      <div className="row justify-content-center">
        <Timer roundTime={turnTime} time={timeForRound} />
      </div>
      <h2 className="text-center">{drawerNick}'s masterpiece</h2>
      {turn && (
        <div style={{ margin: "2%" }}>
          <img
            src={session.players[turn].drawing}
            style={{
              display: "block",
              margin: "0 auto",
              border: "2px solid black"
            }}
          />
        </div>
      )}
      {uid === turn ? (
        <div>
          <DisplayResults
            code={code}
            drawerId={turn}
            targetWord={targetWord}
            uid={uid}
          />
        </div>
      ) : (
        <GuessForm session={session} uid={uid} code={code} drawerId={turn} />
      )}
    </div>
  );
};

export default DrawingDisplay;
