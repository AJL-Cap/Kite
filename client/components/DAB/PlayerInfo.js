import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import { Card } from "react-bootstrap";

const db = fire.database();

const PlayerInfo = props => {
  const { code, uid } = props;
  const [player, loading, error] = useObjectVal(
    db.ref(`gameSessions/${code}/players/${uid}`)
  );

  if (loading) return "";
  if (error) return "Error";

  return (
    <div className="m-3">
      <Card style={{ width: "12rem" }} bg="dark" text="light">
        <Card.Body>
          <Card.Title>
            {player.nickname} <br /> <br />
            <Card bg="light" text="dark">
              Points: {player.points}
            </Card>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlayerInfo;
