/* eslint-disable complexity */
import React from "react";
import { useObject, useListVals } from "react-firebase-hooks/database";
import fire from "../../fire";
import Chat from "../Game/Chat";
import UpdateFinalPoints from "./UpdateFinalPoints";
import PlayerInfo from "./PlayerInfo";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UIfx from "uifx";
import sound from "../../audio/cheer.wav";
import sound2 from "../../audio/sad.wav";

const db = fire.database();

const EndGame = props => {
  const yay = new UIfx(sound, {
    volume: 0.3, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const wrong = new UIfx(sound2, {
    volume: 0.3, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
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
  if (points > 0) {
    yay.play();
    newWins += 1;
  } else wrong.play();

  const updatePointsObj = {
    totalPoints: newTP,
    totalGamesPlayed: newTG,
    wins: newWins
  };
  return (
    <Container fluid>
      <Row>
        <h1>The word was: {targetWord}</h1>
        <h2>
          You got it{" "}
          {points
            ? "right! good job."
            : `WRONG. You had ${
                players.length
              } brains and you still couldn't figure it out.`}
        </h2>
      </Row>
      {playerSnap.ref && (
        <UpdateFinalPoints
          updatePointsObj={updatePointsObj}
          playerSnapRef={playerSnap.ref}
          players={players}
          userId={uid}
        />
      )}
      <Row>
        <Col xs={6} md={4}>
          {players.map(key => {
            return <PlayerInfo key={key} id={key} code={code} end={true} />;
          })}
        </Col>
        <Col xs={12} md={8}>
          {session.finalGuess && (
            <div>
              Final guess was: {Object.values(session.finalGuess)[0]} by{" "}
              {Object.keys(session.finalGuess)[0]}
            </div>
          )}
          <Link to="/games">
            <button className="btn btn-outline-info">Back to Games</button>
          </Link>
          <Chat
            code={code}
            userId={uid}
            players={players}
            messages={messages}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default EndGame;
