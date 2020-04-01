import React, { useState } from "react";
import { useForm } from "react-hook-form";
import fire from "../../fire";
import firebase from "firebase";
const provider = new firebase.auth.GoogleAuthProvider();

export default function Login(props) {
  const { register, handleSubmit } = useForm();
  const [loginErr, setLoginErr] = useState(null);

  const handleClick = () => {
    fire
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        props.history.push("/form");
      })
      .catch(err => {
        setLoginErr(err.message);
      });
  };

  const onSubmit = data => {
    fire
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => props.history.push("/"))
      .catch(err => {
        setLoginErr(err.message);
      });
  };

  if (loginErr) return <h1>{loginErr}</h1>;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Log In</h1>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" ref={register} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          ref={register({ required: true, minLength: 6 })}
        />
        <input type="submit" />
      </form>
      <button type="button" onClick={handleClick}>
        Log in with gmail
      </button>
    </div>
  );
}
