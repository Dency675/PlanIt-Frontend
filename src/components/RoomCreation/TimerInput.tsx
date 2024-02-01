// TimerInput.tsx
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import React from "react";

const TimerInput: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker views={["minutes", "seconds"]} format="mm:ss" />
    </LocalizationProvider>
  );
};

export default TimerInput;
