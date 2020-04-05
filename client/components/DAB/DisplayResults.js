import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { useList, useObjectVal } from "react-firebase-hooks/database";
import Guess from "./Guess";

const db = fire.database();

const DisplayResults = props => {
  const { code, drawerId, targetWord } = props;
  const [playersSnap, loading, error] = useObjectVal(
    db.ref(`gameSessions/${code}/players`)
  );

  if (loading) return "";
  if (error) return "error";

  const players = Object.entries(playersSnap);
  console.log(players);
  const guessors = players.filter(guessor => guessor[0] !== drawerId);
  console.log(guessors);
  return (
    <div>
      <h4>The answer is {targetWord}</h4>
      <div>
        {guessors.map(guessor => (
          <Guess
            key={guessor[0]}
            guessorNick={guessor[1].nickname}
            correct={guessor[1].guess}
            guesses={Object.values(guessor[1].responses)}
            drawerId={drawerId}
            code={code}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayResults;
