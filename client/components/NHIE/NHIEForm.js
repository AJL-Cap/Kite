import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import PostResponse from "./PostResponse";
import { useHistory } from "react-router-dom";

export default function NHIEForm(props) {
  const { userId, code } = props;
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const route = `/api/games/${code}/response`;
  const request = {
    uid: userId,
    response: ""
  };

  useEffect(() => {
    axios.post(route, request);
  }, []);

  const onSubmit = data => {
    axios.post(route, { ...request, response: data.response });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <h2>Your response has been submitted</h2>
        <div>
          <PostResponse {...props} />
        </div>
      </div>
      //render new component?
    );
  }

  if (!submitted) {
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
