import React from "react";

const Guess = props => {
  const { guessor, correct } = props;

  return (
    <div>
      {guessor} {correct ? "guessed it right ✅ " : "guessed it wrong ❌"}
    </div>
  );
};

export default Guess;
