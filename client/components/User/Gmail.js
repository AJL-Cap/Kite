import React, { useState, useEffect } from "react";
import fire from "../../fire";
import firebase from "firebase";
const provider = new firebase.auth.GoogleAuthProvider();
export default function Gmail(props) {
  const [loginErr, setLoginErr] = useState(null);

  useEffect(() => {
    fire
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        props.history.push("/form");
      })
      .catch(err => {
        setLoginErr(err.message);
      });
  }, []);

  if (loginErr) return <h1>{loginErr}</h1>;
  return <div />;
}
