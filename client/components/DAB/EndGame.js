/* eslint-disable complexity */
import React, { useEffect, useState } from "react";
import { useObject, useListVals } from "react-firebase-hooks/database";
import fire from "../../fire";
import Chat from "../Game/Chat";
import UpdateFinalPoints from "./UpdateFinalPoints";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FinalArt from "./FinalArt";
const db = fire.database();

const EndGame = props => {
  const { uid, players, session, code } = props;
  const [updatePointsObj, setUpdatePointsObj] = useState({});
  const [playerSnap, loading, error] = useObject(db.ref(`players/${uid}`));
  const [messages, messageLoading, messageError] = useListVals(
    db.ref(`lobbyMessages/${props.code}/messages`)
  );
  useEffect(
    () => {
      if (playerSnap && playerSnap.val()) {
        const { totalPoints, totalGamesPlayed, wins } = playerSnap.val();
        let newTP = totalPoints;
        if (players[uid]) newTP += players[uid].points;
        const newTG = totalGamesPlayed + 1;
        let newWins = wins;
        if (players && players[uid].points > 0) newWins += 1;
        setUpdatePointsObj({
          totalPoints: newTP,
          totalGamesPlayed: newTG,
          wins: newWins
        });
      }
    },
    [playerSnap]
  );

  if (loading || messageLoading) return "";
  if (error || messageError) return "Error";
  const playerArr = Object.keys(players);
  return (
    <Container fluid>
      {playerSnap.ref && (
        <UpdateFinalPoints
          updatePointsObj={updatePointsObj}
          playerSnapRef={playerSnap.ref}
          players={playerArr}
          userId={uid}
        />
      )}
      <Row>
        <Col xs={12} md={8}>
          <h1>Gallery</h1>
          <Row>
            {playerArr.map(key => {
              return <FinalArt key={key} id={key} code={code} />;
            })}
          </Row>
        </Col>
        <Col xs={6} md={4}>
          <Link to="/games">
            <button className="btn btn-outline-info mt-5 mb-5">
              Back to Games
            </button>
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
