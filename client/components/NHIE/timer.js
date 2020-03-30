import React, { useEffect, useState } from "react";

const Timer = props => {
  const { round, time } = props;
  console.log();
  const timeCurRoundStarted = round.val().timeStarted;
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setTimeLeft(
        Math.max(
          0,
          time - Math.round((currentTime - timeCurRoundStarted) / 1000)
        )
      );
    }, 1000);
    //unsubscribing:
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <h1>Remaining time: {timeLeft} </h1>;
};

export default Timer;
