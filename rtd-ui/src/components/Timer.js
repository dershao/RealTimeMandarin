import React, {useEffect, useState} from 'react';
import {TIME_LIMIT_SECONDS} from "../constants";


function Timer({isActive, level, setLevel, reset}) {

    const [seconds, setSeconds] = useState(TIME_LIMIT_SECONDS);

    const time = seconds < 10 ? '0' + seconds : seconds;
    const timeDisplay = `00:${time}`;

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    document.getElementById("time-display").innerText = "Time's up!";
                    reset();
                    setSeconds(TIME_LIMIT_SECONDS);
                    setLevel(level + 1);
                } else {
                    setSeconds(seconds => seconds - 1);
                }
            }, 1000);
        } else {
            setSeconds(TIME_LIMIT_SECONDS); // if set to inactive, then reset
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    });

    return (
      <>
          <div className="timer">
              <div id="time-display">{timeDisplay}</div>
          </div>
      </>
    );
}

export default Timer;