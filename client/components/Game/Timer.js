import React, { useEffect, useState } from "react";

const Timer = props => {
  const { roundTime, time } = props;
  console.log();
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setTimeLeft(
        Math.max(0, time - Math.round((currentTime - roundTime) / 1000))
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
