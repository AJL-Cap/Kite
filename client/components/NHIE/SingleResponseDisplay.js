import React, { useState, useEffect } from "react";
import Confession from "./Confession";
import fire from "../../fire";
import UIfx from "uifx";
import sound from "../../audio/ooh.ogg";

const db = fire.database();

const SingleResponseDisplay = props => {
  const Ooh = new UIfx(sound, {
    volume: 0.5, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const { response, uid, code, currentPoints, roundID, responseID } = props;
  const [answered, setAnswered] = useState(false);

  useEffect(
    () => {
      if (responseID === uid) setAnswered(true);
    },
    [responseID, uid]
  );

  const handleClick = iHave => {
    if (iHave) {
      Ooh.play();
      subtract20();
    }
    db
      .ref(
        `gameSessions/${code}/rounds/${roundID}/responses/${responseID}/confessors/${uid}`
      )
      .set(iHave);
    setAnswered(true);
  };

  const subtract20 = () => {
    if (currentPoints > 0)
      db
        .ref(`gameSessions/${code}/players/${uid}/points`)
        .set(currentPoints - 20);
  };

  let confessorsArr = [];
  if (response.confessors) {
    confessorsArr = Object.entries(response.confessors);
  }

  return (
    <div className="jumbotron text-center" id="jumboPlayers">
      <h2>Never has {response.nickname} ever...</h2>
      <h1>{response.text}</h1>
      {answered ? (
        confessorsArr.map(confessor => (
          <Confession
            key={confessor[0]}
            confessorID={confessor[0]}
            hasDoneIt={confessor[1]}
          />
        ))
      ) : (
        <div>
          <button
            className="btn alert-danger mx-2"
            onClick={() => handleClick(true)}
          >
            I have
          </button>
          <button
            className="btn alert-success mx-2"
            onClick={() => handleClick(false)}
          >
            I have NOT
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleResponseDisplay;
