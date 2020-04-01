import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { remainingLetters } from "./util";
import { useForm } from "react-hook-form";

const db = fire.database();

const GuessLetter = props => {
  const { code, session, userId } = props;
  const [displayLetters, setDisplayLetters] = useState("");
  const regex = new RegExp("[" + displayLetters + "]", "i");
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    //probably timer thing? might need to add turns in db to keep track of timestamp
  }, []);

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

    //updating turn status from guessing to guessed
    db.ref(`gameSessions/${code}`).update({
      turnStatus: "guessed"
    });
  };

  return (
    <div>
      Remaining letters:
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
