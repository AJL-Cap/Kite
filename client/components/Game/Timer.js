import React, { useEffect, useState } from "react";
import UIfx from "uifx";
import sound from "../../audio/tick.wav";
import sound2 from "../../audio/chirp.wav";

const Timer = props => {
  const { roundTime, time } = props;
  const [timeLeft, setTimeLeft] = useState(time);
  const tick = new UIfx(sound, {
    volume: 0.2, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const chirp = new UIfx(sound2, {
    volume: 0.2, // number between 0.0 ~ 1.0
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
  if (timeLeft === 10 || timeLeft === 9 || timeLeft === 8) {
    //tick.play();
    chirp.play();
  }
  return timeLeft <= 10 ? (
    <h1 className="text-danger">Remaining time: {timeLeft} </h1>
  ) : (
    <h1>Remaining time: {timeLeft} </h1>
  );
};

export default Timer;
