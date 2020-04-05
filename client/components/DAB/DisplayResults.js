import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { useList, useObjectVal } from "react-firebase-hooks/database";
import Guess from "./Guess";

const db = fire.database();

const DisplayResults = props => {
  const { code, drawerId } = props;
  const [guessorsSnap, loading, error] = useObjectVal(
    db.ref(`gameSessions/${code}/players/${drawerId}/guessors`)
  );

  if (loading) return "";
  if (error) return "error";
  const guessors = Object.entries(guessorsSnap);

  return (
    <div>
      <div>
        {guessors.map((guessor, idx) => (
          <Guess key={idx} guessor={guessor[0]} correct={guessor[1]} />
        ))}
      </div>
    </div>
  );
};

export default DisplayResults;
