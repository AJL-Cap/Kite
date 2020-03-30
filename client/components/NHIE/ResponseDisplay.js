import React, { useEffect } from "react";
import SingleResponseDisplay from "./SingleResponseDisplay";
import Timer from "./Timer";
import { useList, useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
const db = fire.database();

const ResponseDisplay = props => {
  const { session, uid, code } = props;
  const currentPoints = session.players[uid].points;
  const [rounds, loading, error] = useList(
    db.ref(`gameSessions/${code}/rounds`)
  );

  if (loading) return "";
  if (error) return <div>err</div>;

  const curRound = rounds[rounds.length - 1];
  const roundsArr = Object.values(session.rounds);
  const recentRound = roundsArr[roundsArr.length - 1];

  const responses = Object.entries(recentRound.responses).filter(
    entry => entry[0] !== uid
  );
  // filter commented out for easier solo testing

  // finding the most recent round, filtering the responses to exclude the one you sent in yourself
  // console.log("recentRound", recentRound);
  return (
    <div>
      <Timer round={curRound} time={30} />
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
