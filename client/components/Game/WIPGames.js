import React from "react";

const WIPGames = props => {
  return (
    <div className="m-5 text-center">
      <h3>🚧 This game is under construction! Please try again later.</h3>
      <br />
      <button
        type="button"
        className="btn btn-info"
        onClick={() => props.history.push("/games")}
      >
        back to games
      </button>
    </div>
  );
};

export default WIPGames;
