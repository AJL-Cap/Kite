import React, { useEffect } from "react";

const UpdateFinalPoints = props => {
  const { playerSnap, updatePointsObj } = props;

  useEffect(() => {
    playerSnap.ref.update(updatePointsObj);
  }, []);

  return <div />;
};

export default UpdateFinalPoints;
