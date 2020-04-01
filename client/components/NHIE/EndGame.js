import React from "react";
import PlayerInfo from "./PlayerInfo";
import { useObject } from "react-firebase-hooks/database";
import UpdateFinalPoints from "./UpdateFinalPoints";
import fire from "../../fire";
import Chat from "../Game/Chat";
const db = fire.database();

const EndGame = props => {
  const { players } = props.session;
  const { uid } = props;
  const [playerSnap, loading, error] = useObject(db.ref(`players/${uid}`));

  if (loading) return "";
  if (error) return "Error";

  const { totalPoints, totalGamesPlayed, wins } = playerSnap.val();
  const newTP = totalPoints + players[uid].points;
  const newTG = totalGamesPlayed + 1;
  let newWins = wins;
  if (players[uid].points > 0) newWins += 1;
  const updatePointsObj = {
    totalPoints: newTP,
    totalGamesPlayed: newTG,
    wins: newWins
  };

  //need a new reference to players in that session for accurate points
  let winners = [];
  let losers = [];
  //   console.log("players", props.players);
  props.players.forEach(playerKey => {
    if (players[playerKey].points <= 0) {
      losers.push(playerKey);
    } else {
      winners.push(playerKey);
    }
  });
  //console.log("winners", winners, "losers", losers);
  return (
    <div className="container mt-3">
      <div className="row justify-content-between">
        <div className=" col-6">
          <div className="jumbotron text-center border border-dark">
            <h1>Winners</h1>
            {winners.map(winner => (
              <PlayerInfo
                id={winner}
                points={players[winner].points}
                key={winner}
              />
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="jumbotron text-center border border-dark">
            <h1>Losers</h1>
            {losers.map(loser => (
              <PlayerInfo
                id={loser}
                points={players[loser].points}
                key={loser}
              />
            ))}
          </div>
        </div>
      </div>
      {playerSnap.ref && (
        <UpdateFinalPoints
          updatePointsObj={updatePointsObj}
          playerSnapRef={playerSnap.ref}
        />
      )}
      <Chat code={props.code} userId={uid} players={players} />
    </div>
  );
};

export default EndGame;
