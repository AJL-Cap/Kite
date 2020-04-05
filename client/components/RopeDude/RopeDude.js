/* eslint-disable complexity */
import React, { useEffect, useState } from "react";
import fire from "../../fire";
import NotFound from "../NotFound";
import PlayerInfo from "./PlayerInfo";
import DisplayWord from "./DisplayWord";
import GuessLetter from "./GuessLetter";
import LetterBank from "./LetterBank";
import HangMan from "./HangMan";
import { Button } from "react-bootstrap";
import FinalGuess from "./FinalGuess";
import EndGame from "./EndGame";
import Container from "react-bootstrap/Container";
import { useObjectVal } from "react-firebase-hooks/database";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const db = fire.database();

const RopeDude = props => {
  const { code, host, userId } = props;
  const [finalGuess, setFinalGuess] = useState(false);
  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );

  useEffect(() => {
    if (host) {
      //host setting session total points to 120
      db.ref(`gameSessions/${code}`).update({
        points: 120
      });
    }
  }, []);

  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;
  const nick = session.players[userId].nickname;
  let players = Object.keys(session.players);

  const handleClick = () => {
    console.log("clicked");
    setFinalGuess(!finalGuess);
  };

  return (
    <Container fluid>
      {session.status === "playing" && (
        <Row>
          <Col id="playerDisplayPoints">
            <div
              className="jumbotron text-center justify-content-center"
              id="jumboPlayers"
              style={{ width: "16rem" }}
            >
              <h2>
                <strong>Players: </strong>
              </h2>
              {players.map(key => {
                return (
                  <PlayerInfo
                    key={key}
                    id={key}
                    code={code}
                    session={session}
                  />
                );
              })}
            </div>
          </Col>
          <Col className="col-9">
            <div className="jumbotron text-center">
              <Row>
                <Col md="auto">
                  <HangMan code={code} session={session} />
                </Col>
                <Col md="auto">
                  <DisplayWord code={code} session={session} />
                </Col>
              </Row>
              <hr />
              <LetterBank code={code} session={session} />
            </div>
            <br />
            <Row>
              {session.turn === userId && (
                <div className="card" style={{ width: "100rem" }}>
                  <div className="card-body">
                    <GuessLetter
                      userId={userId}
                      code={code}
                      session={session}
                    />
                    <Button className="btn btn-danger" onClick={handleClick}>
                      Final Guess
                    </Button>
                    {finalGuess && (
                      <FinalGuess
                        session={session}
                        code={code}
                        uid={userId}
                        nick={nick}
                      />
                    )}
                  </div>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      )}
      {session.status === "finished" && (
        <EndGame
          players={players}
          session={session}
          uid={props.userId}
          code={code}
        />
      )}
    </Container>
  );
};

export default RopeDude;
