import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import fire from "../../fire";
import { useList, useObjectVal } from "react-firebase-hooks/database";
import Timer from "./Timer";

const db = fire.database();

export default function NHIEForm(props) {
  const { userId, code } = props;
  const [submitted, setSubmitted] = useState(false);
  const [rounds, loading, error] = useList(
    db.ref(`gameSessions/${code}/rounds`)
  );
  const [nick, loadNick, errNick] = useObjectVal(
    db.ref("players/" + userId + "/nickname")
  );
  const { register, handleSubmit, errors } = useForm();

  if (loading || loadNick) return <div>loading</div>;
  if (error || errNick) return <div>err</div>;
  //getting current round
  const curRound = rounds[rounds.length - 1];

  const onSubmit = data => {
    //updating responses in the current round for each user
    db
      .ref(`gameSessions/${code}/rounds/${curRound.key}/responses/${userId}`)
      .update({
        nickname: nick,
        text: data.response
      });
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div>Your response has been submitted</div>
      //render new component?
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Timer round={curRound} time={60} />
      </div>
      <h1>Submit your response for this round</h1>
      <label htmlFor="response">Never have I ever...</label>
      <input
        type="text"
        name="response"
        placeholder="ex: peed in a pool"
        ref={register({ required: true })}
      />
      {errors.response && <p>You must enter a response!</p>}
      <input type="submit" />
    </form>
  );
}
