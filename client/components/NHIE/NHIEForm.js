import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import fire from "../../fire";
import { useList, useObjectVal } from "react-firebase-hooks/database";
import Timer from "../Game/Timer";
import NotFound from "../NotFound";

const db = fire.database();

export default function NHIEForm(props) {
  const { userId, code, host } = props;
  // useEffect(() => {
  //   if (host) {
  //     db.ref(`gameSessions/${code}/rounds`).push({ timeStarted: Date.now() });
  //   }
  // }, []);
  const [submitted, setSubmitted] = useState(false);
  const [rounds, loading, error] = useList(
    db.ref(`gameSessions/${code}/rounds`)
  );
  const [nick, loadNick, errNick] = useObjectVal(
    db.ref("players/" + userId + "/nickname")
  );
  const { register, handleSubmit, errors } = useForm();

  if (loading || loadNick) return "";
  if (error || errNick) return <div>err</div>;
  //getting current round
  const curRound = rounds[rounds.length - 1];
  if (!curRound) return <NotFound />;

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

  return (
    <div>
      <div className="row justify-content-center">
        <Timer roundTime={curRound.val().timeStarted} time={60} />
      </div>
      {submitted ? (
        <h4>Your response has been submitted</h4>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card text-center">
            <div className="card-header">
              <strong>Submit your response for this round</strong>
            </div>
            <div className="card-body">
              <h5 className="card-title">Never have I ever...</h5>
              <p className="card-text">
                <input
                  type="text"
                  name="response"
                  placeholder="ex: peed in a pool"
                  ref={register({ required: true })}
                />
                {errors.response && <p>You must enter a response!</p>}
                <input type="submit" />
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
