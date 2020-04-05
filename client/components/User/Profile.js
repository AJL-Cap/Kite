import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import Stats from "./Stats";
import RecentPlayers from "./RecentPlayers";
// import UIfx from "uifx";
// import beepSound from "../../assets/success-low.wav";

export default function Profile(props) {
  const { userId } = props;
  const playerRef = fire.database().ref(`players/${userId}`);
  // const beep = new UIFx({ asset: beepSound });

  const [player, loading, err] = useObjectVal(playerRef);

  if (loading) {
    return "";
  }
  if (err) {
    return <div>error!</div>;
  }
  if (player) {
    return (
      <div>
        <div className="jumbotron text-center alert-dark">
          <h1>
            <strong>Welcome to your Profile {player.nickname} </strong>
          </h1>
          {/* <button type="button" onClick={beep.play}>
            Play
          </button> */}
        </div>
        <div className="column m-5">
          <Stats player={player} />
        </div>
        <div className="col mb-4 align-self-center">
          {player.recentPlayers && (
            <div className="column m-5">
              <RecentPlayers recents={player.recentPlayers} invite={false} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
