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
      <h5>What you are looking for does not exist.</h5>
      <button type="button" onClick={() => history.push("/games")}>
        Back to lobby
      </button>
    </div>
  );
};

export default NotFound;
