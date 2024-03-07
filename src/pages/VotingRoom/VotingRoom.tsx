import React from "react";
import { Container, Grid } from "@mui/joy";
import LeftComponent from "../../components/VotingRoom/LeftComponent";
import RightComponent from "../../components/VotingRoom/RightComponent";

interface VotingRoomProp {
  userId: string;
  sessionId: string;
  scrumMasterId: string;
  timer: string;
  estimationId: number;
  teamId: number;
  currentUserStoryId: number;
  setCurrentUserStoryId: React.Dispatch<React.SetStateAction<number>>;
}

const VotingRoom = ({
  userId,
  sessionId,
  scrumMasterId,
  timer,
  estimationId,
  teamId,
  setCurrentUserStoryId,
  currentUserStoryId,
}: VotingRoomProp) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={12} sm={8} md={8} lg={8}>
          <LeftComponent
            userId={userId}
            sessionId={sessionId as string}
            scrumMasterId={scrumMasterId}
            timer={timer}
            estimationId={estimationId}
            teamId={teamId}
            setCurrentUserStoryId={setCurrentUserStoryId}
          />
        </Grid>
        <Grid xs={12} sm={8} md={4} lg={4}>
          <RightComponent
            sessionId={sessionId as string}
            currentUserStoryId={currentUserStoryId}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default VotingRoom;
