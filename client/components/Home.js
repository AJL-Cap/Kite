import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { NavLink } from "react-router-dom";
import fire from "../fire";

export default function Home({ userId }) {
  const [player, loading, error] = useObjectVal(
    fire.database().ref(`players/${userId}`)
  );

  if (loading) return "";
  if (error) return <p>Error!</p>;

  return player ? (
    <div className="m-4 text-center">
      <h1>🪁 Kite 🪁</h1>
      <p>near, far, wherever we are... </p>
      <h3>Welcome {player.nickname}!</h3>
      <div>
        <NavLink to="/games"> Host or join a game! 🎮</NavLink>
      </div>
    </div>
  ) : (
    <div className="m-4 text-center">
      <h1>🪁 Kite 🪁</h1>
      <p>near, far, wherever we are... </p>
      <h3>Welcome to Kite!</h3>
      <p>
        {" "}
        Please <NavLink to="/login">log in </NavLink> or{" "}
        <NavLink to="/signup">sign up </NavLink> to continue.
      </p>
    </div>
  );
}
