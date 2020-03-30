import React, { useEffect } from "react";

const UpdateFinalPoints = props => {
  const { playerSnapRef, updatePointsObj } = props;

  useEffect(() => {
    playerSnapRef.update(updatePointsObj);
  }, []);

  return <div />;
};

export default UpdateFinalPoints;
