import React from "react";
import { useObjectVal, useList } from "react-firebase-hooks/database";
import fire from "../../fire";
import { Card } from "react-bootstrap";

const db = fire.database();
const playerRef = db.ref("players");

const PlayerInfo = props => {
  const { code, session } = props;
  const [playerSnapshot, playerLoading, playerError] = useObjectVal(
    playerRef.child(props.id)
  );
  const [letterBank, loading, error] = useList(
    db.ref(`gameSession/${code}/letterBank`)
  );

  if (playerLoading || loading) return "";
  if (playerError || error) return "Error";

  //to add: display words they guess correctly

  return (
    <div className="m-3">
      <Card style={{ width: "12rem" }} bg="dark" text="light">
        {playerSnapshot.profilePic ? (
          <Card.Img variant="top" src={playerSnapshot.profilePic.secure_url} />
        ) : (
          <Card.Img variant="top" src="" />
        )}
        <Card.Body>
          <Card.Title>
            {playerSnapshot.nickname} <br />
          </Card.Title>
          <Card.Text />
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlayerInfo;
