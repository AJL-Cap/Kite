/* eslint-disable complexity */
import React from "react";
import { useObject, useListVals } from "react-firebase-hooks/database";
import fire from "../../fire";
import Chat from "../Game/Chat";
import UpdateFinalPoints from "./UpdateFinalPoints";
import PlayerInfo from "./PlayerInfo";
const db = fire.database();

const EndGame = props => {
  const { uid, players, session, code } = props;
  const { points, targetWord } = session;
  const [playerSnap, loading, error] = useObject(db.ref(`players/${uid}`));
  const [messages, messageLoading, messageError] = useListVals(
    db.ref(`lobbyMessages/${props.code}/messages`)
  );
  if (loading || messageLoading) return "";
  if (error || messageError) return "Error";

  const { totalPoints, totalGamesPlayed, wins } = playerSnap.val();
  const newTP = totalPoints + points;
  const newTG = totalGamesPlayed + 1;
  let newWins = wins;
  if (points > 0) newWins += 1;
  const updatePointsObj = {
    totalPoints: newTP,
    totalGamesPlayed: newTG,
    wins: newWins
  };

  return (
    <div className="container mt-3">
      <div>
        <h1>The word was: {targetWord}</h1>
        <h2>
          You got it{" "}
          {points
            ? "right! good job."
            : `WRONG. You had ${
                players.length
              } brains and you still couldn't figure it out.`}
        </h2>
      </div>
      {playerSnap.ref && (
        <UpdateFinalPoints
          updatePointsObj={updatePointsObj}
          playerSnapRef={playerSnap.ref}
          players={players}
          userId={uid}
        />
      )}
      {players.map(key => {
        return <PlayerInfo key={key} id={key} code={code} end={true} />;
      })}
      {session.finalGuess && (
        <div>
          Final guess was: {Object.values(session.finalGuess)[0]} by{" "}
          {Object.keys(session.finalGuess)[0]}
        </div>
      )}
      <Chat code={code} userId={uid} players={players} messages={messages} />
    </div>
  );
};

export default EndGame;
