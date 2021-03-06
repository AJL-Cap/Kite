import React from "react";
import { useObject } from "react-firebase-hooks/database";
import fire from "../../fire";
import makeRoomCode from "../../roomCodes";

const db = fire.database();

const GameCard = props => {
  const { gameRef, gameId, uid, history, nick } = props;
  const [game, loading, error] = useObject(gameRef);
  const code = makeRoomCode();

  if (loading) return "";
  if (error) return <p>Error</p>;

  const handleClick = () => {
    if (gameId > 3) {
      history.push("/wip");
    } else {
      db.ref("gameSessions/" + code).set({
        gameId: gameId,
        status: "waiting",
        players: { [uid]: { host: true, nickname: nick } },
        sessionCreated: Date(Date.now()).toString()
      });
      history.push({
        pathname: `/games/${code}`,
        state: { host: true }
      });
    }
  };

  return (
    <div className="card" style={{ margin: "5%" }}>
      <div className="card-body">
        <h2 className="card-title">{game.val().title}</h2>
        <p className="card-text">Rules: {game.val().rules}</p>
        {uid && (
          <button
            type="button"
            className="btn alert-info"
            onClick={handleClick}
          >
            Start New Game
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCard;
