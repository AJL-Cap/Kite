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
const db = fire.database();

const EndGame = props => {
  const { uid, players, session, code } = props;
  const [playerSnap, loading, error] = useObject(db.ref(`players/${uid}`));
  const [messages, messageLoading, messageError] = useListVals(
    db.ref(`lobbyMessages/${props.code}/messages`)
  );
  if (loading || messageLoading) return "";
  if (error || messageError) return "Error";
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

  return (
    <Container fluid>
      <Row />
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
