import React from "react";
import {
  useObjectVal,
  useListVals,
  useList
} from "react-firebase-hooks/database";
import fire from "../../fire";
import { Card } from "react-bootstrap";
const db = fire.database();
const playerRef = db.ref("players");
const PlayerInfo = props => {
  const { code, id, session } = props;
  const [playerSnapshot, playerLoading, playerError] = useObjectVal(
    playerRef.child(id)
  );
  const [correctGuesses, loading, error] = useListVals(
    db.ref(`gameSessions/${code}/players/${id}/correctGuesses`)
  );
  if (playerLoading || loading) return "";
  if (playerError || error) return "Error";
  //to add: display words they guess correctly
  return (
    <div>
      <Card
        style={{ width: "12rem" }}
        className="border border-dark mt-2"
        bg="light"
        text="dark"
      >
        {playerSnapshot.profilePic ? (
          <Card.Img variant="top" src={playerSnapshot.profilePic.secure_url} />
        ) : (
          <Card.Img variant="top" src="" />
        )}
        <Card.Body>
          <Card.Title>
            {playerSnapshot.nickname} <br />
          </Card.Title>
          <Card.Text>
            <label>Correct Guesses: </label>
            {correctGuesses &&
              correctGuesses.map(correctGuess => {
                return correctGuess + "     ";
              })}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default PlayerInfo;
