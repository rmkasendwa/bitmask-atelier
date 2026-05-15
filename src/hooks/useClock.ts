import { useEffect, useState } from "react";

export function useClock() {
  const [clockLabel, setClockLabel] = useState("--:--:--");

  useEffect(() => {
    const updateClock = () => {
      setClockLabel(
        new Intl.DateTimeFormat("en", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(new Date())
      );
    };

    updateClock();
    const intervalId = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return clockLabel;
}
