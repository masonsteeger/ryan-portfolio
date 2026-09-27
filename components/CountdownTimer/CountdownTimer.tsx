import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Typography } from "@mui/material";

interface CountdownTimerProps {
  timeValue: number;
}

export default function CountdownTimer({ timeValue }: CountdownTimerProps) {
  const reservationExpired = DateTime.now().plus({ milliseconds: timeValue });

  const [display, setDisplay] = useState<string | undefined>();

  useEffect(() => {
    const interval = setInterval(() => {
      const time = reservationExpired
        .diff(DateTime.now(), ["milliseconds"])
        .toFormat("mm:ss");
      setDisplay(time);
      if (time === "00:00") {
        clearInterval(interval);
      }
    }, 1000);
  }, []);
  return <Typography variant={"h5"}>{display}</Typography>;
}
