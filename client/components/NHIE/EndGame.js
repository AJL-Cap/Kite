import React from "react";
import session from "express-session";
import PlayerInfo from "./PlayerInfo";

const EndGame = props => {
  let players = props.session.players;
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
  console.log("winners", winners, "losers", losers);
  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <div className="jumbotron text-center">
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
        <div className="column">
          <div className="jumbotron text-center">
            <h1>Losers</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
