import React from "react";
import { useObject, useListVals } from "react-firebase-hooks/database";
import fire from "../../fire";
import Chat from "../Game/Chat";
import UpdateFinalPoints from "./UpdateFinalPoints";
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
      <Chat code={code} userId={uid} players={players} messages={messages} />
    </div>
  );
};

export default EndGame;
