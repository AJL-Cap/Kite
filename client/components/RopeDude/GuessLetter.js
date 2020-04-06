import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { remainingLetters } from "./util";
import { useForm } from "react-hook-form";
import Timer from "../Game/Timer";
import UIfx from "uifx";
import sound from "../../audio/success.wav";
import sound2 from "../../audio/miao.wav";
import sound3 from "../../audio/wrong.mp3";

const db = fire.database();

const GuessLetter = props => {
  const itsYourTurn = new UIfx(sound, {
    volume: 0.2, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const right = new UIfx(sound2, {
    volume: 0.5, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const wrong = new UIfx(sound3, {
    volume: 0.5, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const { code, session, userId, players } = props;
  const targetWord = session.targetWord;
  const [displayLetters, setDisplayLetters] = useState("");
  //this is for pattern validation in form:
  const regex = new RegExp("[" + displayLetters + "]", "i");
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    itsYourTurn.play();
  }, []);

  useEffect(
    () => {
      let letterBank = [];
      if (session.letterBank) {
        letterBank = Object.keys(session.letterBank);
      }
      //getting all alphabets that have not been guessed
      setDisplayLetters(remainingLetters(letterBank));
    },
    [session.letterBank]
  );

  const onSubmit = data => {
    const letter = data.guessLetter.toUpperCase();
    //updating letterbank in db
    db.ref(`gameSessions/${code}/letterBank/${letter}`).set(userId);

    //when wrong guess is submitted, deduct 20 points
    if (!targetWord.includes(letter)) {
      wrong.play();
      db.ref(`gameSessions/${code}`).update({ points: session.points - 20 });
    } else right.play();

    if (targetWord.includes(data.guessLetter.toUpperCase())) {
      db
        .ref(`gameSessions/${code}/players/${userId}/correctGuesses`)
        .push(letter);
    }
  };

  return (
    <div>
      {players.length > 1 && (
        <Timer roundTime={session.turnTimeStarted} time={20} />
      )}
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
        <br />
        <input type="submit" className="btn btn-info" />
      </form>
    </div>
  );
};

export default GuessLetter;
