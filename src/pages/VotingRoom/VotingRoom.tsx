import React from "react";
import { Box, Container, Grid } from "@mui/joy";
import LeftComponent from "../../components/VotingRoom/LeftComponent";
import RightComponent from "../../components/VotingRoom/RightComponent";

function VotingRoom() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid  xs={12} sm={8} md={8} lg={8}>
          <LeftComponent />
        </Grid>
        <Grid  xs={12} sm={4} md={4} lg={4}>
          <RightComponent />
        </Grid>
      </Grid>
    </Container>
  );
}

export default VotingRoom;
