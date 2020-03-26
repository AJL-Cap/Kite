import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function NHIEForm({ userId, code }) {
  const [timeUp, setTimeUp] = useState(false);
  const [timer, setTimer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const route = `/api/games/${code}/response`;
  const request = {
    uid: userId,
    response: "",
    responding: false
  };

  useEffect(() => {
    axios.post(route, { ...request, responding: true });
    setTimer(
      setTimeout(() => {
        setTimeUp(true);
        axios.post(route, {
          ...request,
          response: "Nothing Submitted",
          responding: false
        });
      }, 8000)
    );
    //currently set to 8 seconds for testing purpose
  }, []);

  const onSubmit = data => {
    axios.post(route, { ...request, response: data.response });
    //option 1:
    // history.push('new path?')
    //option 2:
    setSubmitted(true);
    setTimer(clearTimeout(timer));
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
