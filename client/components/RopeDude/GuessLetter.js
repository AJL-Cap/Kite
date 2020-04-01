import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { remainingLetters } from "./util";
import { useForm } from "react-hook-form";
import Timer from "../Game/Timer";

const db = fire.database();

const GuessLetter = props => {
  const { code, session, userId } = props;
  const [displayLetters, setDisplayLetters] = useState("");
  const regex = new RegExp("[" + displayLetters + "]", "i");
  const { register, handleSubmit, errors } = useForm();

  useEffect(
    () => {
      let letterBank = [];
      if (session.letterBank) {
        letterBank = Object.keys(session.letterBank);
      }
      setDisplayLetters(remainingLetters(letterBank));
    },
    [session.letterBank]
  );

  const onSubmit = data => {
    console.log(data);
    //updating letterbank in db
    db
      .ref(`gameSessions/${code}/letterBank/${data.guessLetter.toUpperCase()}`)
      .set(userId);

    //updating turn to next player (hardcoded for now)
    // db.ref(`gameSessions/${code}`).update({
    //   turn: "UID2"
    // });
  };

  return (
    <div>
      <Timer roundTime={session.turnTimeStarted} time={30} />
      Choose from the following letters:
      {displayLetters
        .split("")
        .map(el => " " + el + " ")
        .join("")}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="guessLetter"> </label>
        <input
          type="text"
          name="guessLetter"
          ref={register({ maxLength: 1, pattern: regex })}
        />
        {errors.guessLetter && (
          <p>You must guess 1 character from the remaining letters!</p>
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

export default GuessLetter;
