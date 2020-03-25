import React from "react";
import fire from "../fire";
import { useList } from "react-firebase-hooks/database";

export default function Players() {
  const db = fire.database();
  const playersRef = db.ref("players");
  const [players, loading, error] = useList(playersRef);

  if (loading) return "";
  if (error) return <p>Error!</p>;
  return (
    <div>
      {players.map(player => (
        <div key={player.key}>
          {player.val().nickname}
          <button onClick={() => player.ref.remove()}>🗑</button>
        </div>
      ))}
    </div>
  );
}
