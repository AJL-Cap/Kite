import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="m-5 text-center">
      <h1>\_(*~*)_/</h1>
      <br />
      <h1>Error 404: Page Not Found.</h1>
      <br />
      <h5>Try starting a new game.</h5>
      <button
        type="button"
        className="btn btn-info"
        onClick={() => history.push("/games")}
      >
        back to games
      </button>
    </div>
  );
};

export default NotFound;
