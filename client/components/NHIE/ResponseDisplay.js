import React from "react";
import SingleResponseDisplay from "./SingleResponseDisplay";

const ResponseDisplay = props => {
  const { session, uid, code } = props;
  const currentPoints = session.players[uid].points;

  const roundsArr = Object.values(session.rounds);
  const recentRound = roundsArr[roundsArr.length - 1];
  const responses = Object.entries(recentRound.responses).filter(
    entry => entry[0] !== uid
  );
  // finding the most recent round, filtering the responses to exclude the one you sent in yourself

  return (
    <div>
      {responses.map(response => (
        <SingleResponseDisplay
          key={response[0]}
          response={response[1]}
          uid={uid}
          code={code}
          currentPoints={currentPoints}
        />
      ))}
    </div>
  );
};

export default ResponseDisplay;
