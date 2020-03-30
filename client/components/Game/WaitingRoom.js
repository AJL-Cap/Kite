import React from "react";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import SessionPlayer from "./SessionPlayers";
import { Button } from "react-bootstrap";
import NotFound from "../NotFound";
import axios from "axios";

const db = fire.database();

const WaitingRoom = props => {
  //getting that session info
  const { code, userId, host } = props;
  const gameSession = db.ref("gameSessions/" + code);
  const [session, loading, error] = useObjectVal(gameSession);

  if (loading) return "";
  if (error) return "Error";
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
      //updating that session status to playing
      axios.post(`/api/games/${code}`, { status: "playing" });
    } catch (err) {
      console.log("error switching game to playing");
    }
  };
  //getting players from the session
  let players = Object.keys(session.players);

  return (
    <>
      {players.includes(`${userId}`) ? (
        <div>
          <div className="row justify-content-center">
            <h1>Waiting for more players!</h1>
            <br />
            <h2
            >{`Give your friends this code to invite them to your game: ${code}`}</h2>
          </div>
          <div className="container">
            <div className="row">
              <h3 className="mx-auto">Players</h3>
            </div>
            <div className="row">
              {players.map(player => (
                <SessionPlayer player={player} key={player} />
              ))}
            </div>
            {host && (
              <div className="row justify-content-center">
                <Button variant="dark" onClick={handleClick}>
                  Start Game
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default WaitingRoom;
