import {
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

interface TimerInputProps {
  setTimer: React.Dispatch<React.SetStateAction<Date | null>>;
}

const TimerInput: React.FC<TimerInputProps> = ({ setTimer }) => {
  const handleTimeChange = (newTime: Date | null) => {
    setTimer(newTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          label="mm:ss"
          openTo="minutes"
          format="mm:ss"
          views={["minutes", "seconds"]}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          onChange={(value: any) => {
            if (value && value.$d) {
              console.log(value.$d);
              handleTimeChange(value.$d);
            } else {
              console.log("Date is not selected or $d is unavailable");
            }
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimerInput;
