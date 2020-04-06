import React, { useEffect, useState } from "react";
import UIfx from "uifx";
import tick from "../../audio/tick.wav";

const Timer = props => {
  const { roundTime, time } = props;
  const [timeLeft, setTimeLeft] = useState(time);
  const ticking = new UIfx(tick, {
    volume: 0.5, // number between 0.0 ~ 1.0
    throttleMs: 50
  });

  useEffect(
    () => {
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
    },
    [roundTime]
  );

  return timeLeft <= 10 && ticking.play() ? (
    <h1 className="text-danger">Remaining time: {timeLeft} </h1>
  ) : (
    <h1>Remaining time: {timeLeft} </h1>
  );
};

export default Timer;
