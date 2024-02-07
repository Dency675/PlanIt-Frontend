// RoomNameInput.tsx
import React from "react";
import { Input } from "@mui/joy/";

interface RoomNameInputProps {
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
}

const RoomNameInput: React.FC<RoomNameInputProps> = ({ setRoomName }) => {
  return (
    <Input
      color="neutral"
      placeholder="Room Name"
      size="md"
      variant="outlined"
      onChange={(e) => {
        setRoomName(e.target.value as string);
      }}
    />
  );
};

export default RoomNameInput;
