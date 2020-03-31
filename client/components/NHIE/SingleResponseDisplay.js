import React, { useState } from "react";

import fire from "../../fire";

const db = fire.database();

const SingleResponseDisplay = props => {
  const { response, uid, code, currentPoints, roundID, responseID } = props;
  const [answered, setAnswered] = useState(false);

  console.log("responseID: ", responseID);

  const handleClick = iHave => {
    if (iHave) {
      subtract20();
      db
        .ref(
          `gameSessions/${code}/rounds/${roundID}/responses/${responseID}/confessors/${uid}`
        )
        .set(true);
    } else {
      db
        .ref(
          `gameSessions/${code}/rounds/${roundID}/responses/${responseID}/confessors/${uid}`
        )
        .set(false);
    }
    setAnswered(true);
  };

  const subtract20 = () => {
    db
      .ref(`gameSessions/${code}/players/${uid}/points`)
      .set(currentPoints - 20);
  };

  return (
    <div className="jumbotron text-center">
      <h2>Never has {response.nickname} ever...</h2>
      <h1>{response.text}</h1>
      {answered ? (
        <div />
      ) : (
        <div>
          <button className="btn btn-danger" onClick={() => handleClick(true)}>
            I have
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleClick(false)}
          >
            I have NOT
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleResponseDisplay;
