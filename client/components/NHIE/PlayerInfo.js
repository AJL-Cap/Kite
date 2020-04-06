import React, { useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import { Card } from "react-bootstrap";
import UIfx from "uifx";
import sound from "../../audio/celebrate.wav";
import sound2 from "../../audio/sad.wav";

const db = fire.database();
const playerRef = db.ref("players");

const PlayerInfo = props => {
  const win = new UIfx(sound, {
    volume: 0.3, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const lose = new UIfx(sound2, {
    volume: 0.3, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const { gameOver, uid, code } = props;
  const [playerSnapshot, playerLoading, playerError] = useObjectVal(
    playerRef.child(props.id)
  );

  useEffect(() => {
    if (gameOver) {
      db
        .ref(`gameSessions/${code}/players/${uid}`)
        .once("value")
        .then(player => {
          if (player.val().points > 0) win.play();
          if (player.val().points <= 0) lose.play();
        });
    }
  }, []);

  if (playerLoading) return "";
  if (playerError) return "Error";

  //gets kites based on players points
  let kites = function() {
    let points = [];
    for (let i = 0; i < props.points / 20; i++) {
      points.push("🪁");
    }
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
            {playerSnapshot.nickname} <br /> <br />
            {kites()}
          </Card.Title>
          <Card.Text />
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlayerInfo;
