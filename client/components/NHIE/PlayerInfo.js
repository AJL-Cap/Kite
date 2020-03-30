import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import { Card } from "react-bootstrap";

const db = fire.database();
const playerRef = db.ref("players");

const PlayerInfo = props => {
  const [playerSnapshot, playerLoading, playerError] = useObjectVal(
    playerRef.child(props.id)
  );
  if (playerLoading) return "";
  if (playerError) return "Error";
  //gets kites based on players points
  let kites = function() {
    let points = [];
    for (let i = 0; i < props.points / 20; i++) {
      points.push("🪁");
    }
    console.log("inside kites: ", props.points);
    return points;
  };
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
            {playerSnapshot.nickname} <br /> {kites()}
          </Card.Title>
          <Card.Text />
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlayerInfo;
