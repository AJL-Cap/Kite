/* eslint-disable complexity */
import React, { useState, useEffect } from "react";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import Guess from "./Guess";

const db = fire.database();

const DisplayResults = props => {
  const { code, targetWord, uid, drawerId } = props;
  const [artist, setArtist] = useState(drawerId);

  const [playersSnap, loading, error] = useObjectVal(
    db.ref(`gameSessions/${code}/players`)
  );

  useEffect(
    () => {
      setArtist(drawerId);
    },
    [drawerId]
  );

  if (loading) return "";
  if (error) return "error";
  let drawerGuessors = [];
  if (playersSnap[artist].guessors) {
    drawerGuessors = Object.keys(playersSnap[artist].guessors);
  }
  const players = Object.entries(playersSnap);
  const guessors = players.filter(guessor => guessor[0] !== artist);

  let filteredGuessors = [];
  for (let i = 0; i < guessors.length; i++) {
    for (let j = 0; j < drawerGuessors.length; j++) {
      if (guessors[i][0] === drawerGuessors[j]) {
        filteredGuessors.push([guessors[i][0], guessors[i][1]]);
      }
    }
  }

  if (drawerGuessors.length > 0) {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">The answer is {targetWord}</h4>
          {filteredGuessors.map(guessor => (
            <Guess
              key={guessor[0]}
              guessorNick={guessor[1].nickname}
              correct={guessor[1].correct}
              guesses={Object.values(guessor[1].responses)}
              drawerId={artist}
              code={code}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="card text-center">
        Wait while other players guess your drawing!
      </div>
    );
  }
};

export default DisplayResults;
