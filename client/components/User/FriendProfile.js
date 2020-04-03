import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import Stats from "./Stats";

export default function FriendProfile(props) {
  const { uid } = props.match.params;
  const playerRef = fire.database().ref(`players/${uid}`);
  const [player, loading, err] = useObjectVal(playerRef);

  if (loading) {
    return "";
  }
  if (err) {
    return <div>error!</div>;
  }
  if (!player) {
    return <h1>This player does not exist</h1>;
  }

  if (player) {
    return (
      <div>
        <div className="jumbotron text-center alert-dark">
          <h1>
            <strong>Welcome to {player.nickname}'s Profile</strong>
          </h1>
        </div>
        <div className="col mb-4 align-self-center">
          <Stats player={player} />
        </div>
        <button type="button" onClick={() => props.history.goBack()}>
          Back to My Profile
        </button>
      </div>
    );
  }
}
