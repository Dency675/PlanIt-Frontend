import React from "react";
import { Box, Container } from "@mui/joy";
import LeftComponent from "../../components/VotingRoom/LeftComponent";
import RightComponent from "../../components/VotingRoom/RightComponent";

function VotingRoom() {
  return (
    <Container> {/* Set background color */}
      <Box display="flex" flexDirection="row">
        <Box flex={5}>
          <LeftComponent />
        </Box>
        <Box flex={2}>
          <RightComponent />
        </Box>
      </Box>
    </Container>    
  );
}

export default VotingRoom;
