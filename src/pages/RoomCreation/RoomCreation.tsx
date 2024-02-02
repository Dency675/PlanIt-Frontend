import React from "react";
import CreateRoomForm from "../../components/RoomCreation/CreateRoomForm";
import Header from "../../components/Navbar/Header";
import { Box } from "@mui/joy";

const RoomCreation = () => {
  return (
    <Box>
      <Header></Header>
      <CreateRoomForm />
    </Box>
  );
};

export default RoomCreation;
