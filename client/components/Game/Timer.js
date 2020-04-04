import React, { useEffect, useState } from "react";

const Timer = props => {
  const { roundTime, time } = props;
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

  return timeLeft <= 10 ? (
    <h1 className="text-danger">Remaining time: {timeLeft} </h1>
  ) : (
    <h1>Remaining time: {timeLeft} </h1>
  );
};

export default Timer;
