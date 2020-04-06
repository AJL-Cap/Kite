import React, { useState, useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import GuessForm from "./GuessForm";
import DisplayResults from "./DisplayResults";
import Timer from "../Game/Timer";
import fire from "../../fire";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const db = fire.database();

const DrawingDisplay = props => {
  const { session, code, uid, targetWord } = props;
  const [nick, setNick] = useState("");

  const [turnTimeStarted, loading, error] = useObjectVal(
    db.ref(`gameSessions/${code}/turnTimeStarted`)
  );

  const [turnPlayerID, loadingTurn, errorTurn] = useObjectVal(
    db.ref(`gameSessions/${code}/turn`)
  );

  useEffect(
    () => {
      if (session && turnPlayerID)
        setNick(session.players[turnPlayerID].nickname);
    },
    [session, turnPlayerID]
  );

  if (loading || loadingTurn) return "";
  if (error || errorTurn) return "error";

  const numPlayers = Object.keys(session.players).length;
  let timeForRound = 10 + numPlayers * 10;

  return (
    <Container fluid className="justify-content-center align-content-center">
      <Row>
        <Col className="m-1">
          <h2 className="text-center">{nick}'s masterpiece</h2>
          {turnPlayerID && (
            <div style={{ margin: "2%" }}>
              <img
                src={session.players[turnPlayerID].drawing}
                style={{
                  display: "block",
                  margin: "0 auto",
                  border: "2px solid black"
                }}
              />
            </div>
          )}
        </Col>
        <Col className="m-1">
          <Row className="justify-content-center">
            {turnTimeStarted && (
              <Timer roundTime={turnTimeStarted} time={timeForRound} />
            )}
          </Row>
          <Row className="justify-content-center">
            {turnPlayerID && (
              <GuessForm
                session={session}
                uid={uid}
                code={code}
                drawerId={turnPlayerID}
              />
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DrawingDisplay;
