// RoomNameInput.tsx
import React from "react";
import { Input } from "@mui/joy/";

const RoomNameInput: React.FC = () => {
  return (
    <Input
      color="neutral"
      placeholder="Room Name"
      size="md"
      variant="outlined"
    />
  );
};

export default RoomNameInput;
