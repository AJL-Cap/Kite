import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";

const db = fire.database();

const Confession = props => {
  const { confessorID, hasDoneIt } = props;
  const [conSnap, loading, error] = useObjectVal(
    db.ref(`players/${confessorID}`)
  );

  if (loading) return "";
  if (error) return "Error";

  return (
    <div>
      {conSnap.nickname} has {hasDoneIt ? "done this" : "NOT"}
    </div>
  );
};

export default Confession;
