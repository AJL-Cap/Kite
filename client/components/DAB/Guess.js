import React from "react";
import fire from "../../fire";
import { useList, useObjectVal } from "react-firebase-hooks/database";

const db = fire.database();

const Guess = props => {
  const { drawerId, guessorNick, correct, guesses, code } = props;
  // console.log("guessorNick:", guessorNick);
  // console.log("guesses:", guesses);
  // console.log("drawerId:", drawerId);

  const displayGuesses = guesses.map(
    (guess, index) => guess && <li key={index}>{guess}</li>
  );

  return (
    <div>
      <div>
        {guessorNick} {correct ? "guessed it right ✅ " : "guessed it wrong ❌"}
      </div>
      <div>Their guesses were: {displayGuesses}</div>
    </div>
  );
};

export default Guess;
