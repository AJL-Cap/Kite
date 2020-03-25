import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../fire";

export default function Home({ userId }) {
  const [player, loading, error] = useObjectVal(
    fire.database().ref(`players/${userId}`)
  );

  if (loading) return "";
  if (error) return <p>Error!</p>;

  return (
    <div>
      <h1>🪁 Kite 🪁</h1>
      <p>near, far, wherever we are... </p>
      <h3>Welcome {player && player.nickname}!</h3>
    </div>
  );
}
