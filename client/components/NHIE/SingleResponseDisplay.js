import React, { useState } from "react";

import fire from "../../fire";

const db = fire.database();

const SingleResponseDisplay = props => {
  const { response, uid, code, currentPoints } = props;
  const [answered, setAnswered] = useState(false);

  const handleClick = iHave => {
    if (iHave) subtract20();
    setAnswered(true);
  };

  const subtract20 = () => {
    db
      .ref(`gameSessions/${code}/players/${uid}/points`)
      .set(currentPoints - 20);
  };

  if (answered) return <div />;

  return (
    <div className="jumbotron text-center">
      <h2>Never has {response.nickname} ever...</h2>
      <h1>{response.text}</h1>
      <button className="btn btn-danger" onClick={() => handleClick(true)}>
        I have
      </button>
      <button className="btn btn-success" onClick={() => handleClick(false)}>
        I have NOT
      </button>
    </div>
  );
};

export default SingleResponseDisplay;
