import React, { useEffect, useState } from "react";

const Timer = props => {
  const { round, time } = props;
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
    return () => clearInterval(interval);
  }, []);

  return <span>Remaining time: {timeLeft} </span>;
};

export default Timer;
