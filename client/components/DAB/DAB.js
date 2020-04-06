/* eslint-disable complexity */
import React, { useEffect, useState } from "react";
import fire from "../../fire";
import NotFound from "../NotFound";
import SigCanvas from "./SigCanvas";
import DrawingDisplay from "./DrawingDisplay";
import { useObjectVal } from "react-firebase-hooks/database";
import PlayerInfo from "./PlayerInfo";
import EndGame from "./EndGame";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const db = fire.database();
const DAB = props => {
  const { code, host, userId } = props;
  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );

  useEffect(() => {
    if (host) {
      //host setting everyone's game points to 0
      db
        .ref(`gameSessions/${code}/players`)
        .once("value")
        .then(snapshot => {
          snapshot.forEach(childSnap => {
            childSnap.ref.update({ points: 0 });
          });
        });
      //setting first turn time started since backend is being weird
      db.ref(`gameSessions/${code}/turnTimeStarted`).set(Date.now());
    }
  }, []);
  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;
  const { targetWord } = session.players[userId];
  let players = Object.keys(session.players);

  return (
    <div>
      {session.status === "playing" && (
        <div>
          {players.map(key => (
            <PlayerInfo key={key} session={session} uid={key} code={code} />
          ))}
          <div className="m-5 text-center">
            <h1>
              Here's your word:
              <div className="alert alert-info col border border-dark">
                {targetWord}
              </div>
            </h1>
            <br />
            <SigCanvas session={session} uid={userId} code={code} />
          </div>
        </div>
      )}
      {session.status === "guessing" && (
        <Container fluid>
          <Row>
            <Col xs={4} md={2}>
              <Row>
                {players.map(key => (
                  <PlayerInfo
                    key={key}
                    session={session}
                    uid={key}
                    code={code}
                  />
                ))}
              </Row>
            </Col>
            <Col>
              <DrawingDisplay
                session={session}
                uid={userId}
                code={code}
                targetWord={targetWord}
              />
            </Col>
          </Row>
        </Container>
      )}
      {session.status === "finished" && (
        <EndGame uid={userId} code={code} players={session.players} />
      )}
    </div>
  );
};
export default DAB;
