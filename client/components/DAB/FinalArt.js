/* eslint-disable complexity */
import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import { Card } from "react-bootstrap";

const db = fire.database();

const FinalArt = props => {
  const { code, id, points } = props;

  const [player, loading, error] = useObjectVal(
    db.ref(`gameSessions/${code}/players/${id}`)
  );

  if (loading) return "";
  if (error) return "Error";

  return (
    <div>
      {player && (
        <Card
          style={{ width: "20rem" }}
          className="border border-dark m-2"
          bg="light"
          text="dark"
        >
          {player.drawing ? (
            <Card.Img variant="top" src={player.drawing} />
          ) : (
            <Card.Img variant="top" src="" />
          )}
          <Card.Body>
            <Card.Title>
              {player.nickname}'s {player.targetWord}
            </Card.Title>
            <Card.Text>points: {points}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
export default FinalArt;
