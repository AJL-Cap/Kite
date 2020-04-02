import React from "react";
import fire from "../../fire";
import { useObjectVal, useListVals } from "react-firebase-hooks/database";
import SessionPlayer from "./SessionPlayers";
import { Button } from "react-bootstrap";
import NotFound from "../NotFound";
import axios from "axios";
import { useHistory } from "react-router";
import Chat from "./Chat";
import { generateTargetWord } from "../RopeDude/util";

const db = fire.database();

// eslint-disable-next-line complexity
const WaitingRoom = props => {
  let history = useHistory();
  //getting that session info
  const { code, userId, host, gameId } = props;
  const [game, gameLoading, gameErr] = useObjectVal(db.ref(`games/${gameId}`));
  const gameSession = db.ref("gameSessions/" + code);
  const [session, loading, error] = useObjectVal(gameSession);
  const [messages, messageLoading, messageError] = useListVals(
    db.ref(`lobbyMessages/${props.code}/messages`)
  );

  if (loading || gameLoading || messageLoading) return "";
  if (error || gameErr || messageError) return "Error";
  if (!session)
    return (
      <div>
        <NotFound />
        <button type="button" onClick={() => props.history.push("/games")}>
          Back to lobby
        </button>
      </div>
    );

  const handleClick = () => {
    try {
      if (gameId === "2") {
        console.log("2");
        const targetWord = generateTargetWord();
        console.log("targetWord", targetWord);
        db.ref(`gameSessions/${code}/targetWord`).set(targetWord);
      }
      //updating that session status to playing
      axios.post(`/api/games/${code}`, { status: "playing" });
    } catch (err) {
      console.log("error switching game to playing");
    }
  };
  const cancelGame = () => {
    history.push("/games");
    gameSession.remove();
  };
  //getting players from the session
  let players = Object.keys(session.players);

  return (
    <>
      {players.includes(`${userId}`) ? (
        <div className="container">
          <div>
            <div className="row justify-content-between">
              <h1>Waiting for more players!</h1>
              {host && (
                <Button variant="danger" onClick={cancelGame}>
                  Cancel Game
                </Button>
              )}
            </div>
            <div className="row justify-content-center mt-3 mb-3">
              <h2>
                <strong>
                  Give your friends this code to invite them to your game:{" "}
                </strong>
              </h2>
              <h2 className="alert alert-primary" role="alert">
                <strong>{code}</strong>
              </h2>
            </div>
          </div>
          <div className="row">
            <h3>Rules: {game.rules}</h3>
          </div>
          <div>
            <div className="row">
              <h3 className="mx-auto">
                <u>Players</u>
              </h3>
            </div>
            <div className="row">
              {players.map(player => (
                <SessionPlayer player={player} key={player} />
              ))}
            </div>
            {host && players.length > 0 ? (
              <div className="row justify-content-center mb-4">
                <Button variant="dark" onClick={handleClick}>
                  Start Game
                </Button>
              </div>
            ) : (
              <div />
            )}
          </div>
          <div className="row ">
            <Chat
              code={code}
              userId={userId}
              players={players}
              messages={messages}
            />
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default WaitingRoom;
