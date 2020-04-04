import React, { useEffect } from "react";
import SingleResponseDisplay from "./SingleResponseDisplay";
import Timer from "../Game/Timer";
import { useList, useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import NotFound from "../NotFound";
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
  const roundsArr = Object.entries(session.rounds);
  const recentRound = roundsArr[roundsArr.length - 1];
  const roundID = recentRound[0];
  const responses = Object.entries(recentRound[1].responses); //.filter(entry => entry[0] !== uid);

  const numPlayers = Object.keys(session.players).length;
  // finding the most recent round, filtering the responses to exclude the one you sent in yourself
  // console.log("recentRound", recentRound);
  return (
    <div>
      <div className="row justify-content-center">
        <Timer roundTime={curRound.val().timeStarted} time={numPlayers * 10} />
      </div>
      {responses.map(response => (
        <SingleResponseDisplay
          key={response[0]}
          response={response[1]}
          uid={uid}
          code={code}
          responseID={response[0]}
          currentPoints={currentPoints}
          roundID={roundID}
        />
      ))}
    </div>
  );
};

export default ResponseDisplay;
