import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import fire from "../../fire";
const db = fire.database();

export default function NHIEForm(props) {
  const code = props.code
  const [timeUp, setTimeUp] = useState(false);
  const [timer, setTimer] = useState(null)
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const playerRef = db.ref(`gameSessions/${code}/players/${props.userId}`);

  useEffect(() => {
    playerRef.update({ responding: true });
    setTimer(setTimeout(() => {
      setTimeUp(true);
    }, 5000))
    //currently set to 5 seconds for testing purpose
  }, []);

  const onSubmit = data => {
    playerRef.update({ response: data.response, responding: false });
    //option 1:
    // history.push('new path?')
    //option 2:
    setSubmitted(true);
    setTimer(clearTimeout(timer))
  };

  if (timeUp) {
    return (
      <div>Uh oh, time is up! </div>
      //render new component?
    );
  }
  if (submitted) {
    return (
      <div>Your response has been submitted</div>
      //render new component?
    );
  }

  if (!timeUp || !submitted) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
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
}
