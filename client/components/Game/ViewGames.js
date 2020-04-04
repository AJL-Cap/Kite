import React from "react";
import fire from "../../fire";
import { useList } from "react-firebase-hooks/database";
import GameCard from "./GameCard";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const db = fire.database();
const gamesRef = db.ref("games");

const ViewGames = props => {
  const [games, loading, error] = useList(gamesRef);

  if (loading) return "";
  if (error) return <p>Error</p>;

  return (
    <div>
      <div className="jumbotron text-center">
        <h1>
          <strong>Games</strong>
        </h1>
      </div>
      <Container>
        <Row>
          <Col>
            <h2 className="card-title">
              Please{" "}
              <Link to="/login" className="auth">
                log in
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="auth">
                sign up
              </Link>{" "}
              to play these games...
            </h2>
            {games.map(game => (
              <GameCard
                key={game.key}
                gameRef={game.ref}
                gameId={game.key}
                uid={null}
                history={null}
                nick={null}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewGames;
