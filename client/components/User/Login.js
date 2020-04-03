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
        fire
          .database()
          .ref(`players/${result.user.uid}`)
          .once("value")
          .then(snapshot => {
            if (snapshot.val()) props.history.push("/");
            else
              //if user has actually not signed up before:
              props.history.push("/form");
          });
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
    <div className="m-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="formMain">Log In</h1>
        <label htmlFor="email">
          Email <input type="email" name="email" ref={register} />
        </label>
        <label htmlFor="password">
          Password{" "}
          <input
            type="password"
            name="password"
            ref={register({ required: true, minLength: 6 })}
          />
        </label>
        <input type="submit" />
      </form>
      <hr />
      <h2 className="formMain">Or log in with: </h2>
      <button type="button" onClick={handleClick}>
        <img
          src="https://cdn4.iconfinder.com/data/icons/free-colorful-icons/360/gmail.png"
          height="42"
          width="42"
        />{" "}
        Log in with Gmail
      </button>
    </div>
  );
}
