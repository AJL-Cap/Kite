import React from "react";
import PlayerInfo from "./PlayerInfo";

const EndGame = props => {
  let players = props.session.players;
  // const { totalPoints, totalGamesPlayed, wins} = playerSnap.val()
  // console.log("finishedPoints: ", player[1].points)
  // const newTP = totalPoints + player[1].points
  // const newTG = totalGamesPlayed + 1
  // let newWins = wins
  // if (player[1].points > 0) newWins += 1
  // playerSnap.ref.update({totalPoints: newTP, totalGamesPlayed: newTG, wins: newWins})

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
    </div>
  );
};

export default EndGame;
