import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/joy";
import LeftComponent from "../../components/VotingRoom/LeftComponent";
import RightComponent from "../../components/VotingRoom/RightComponent";
import { useParams } from "react-router-dom";
import { sessionDetailsData } from "../ReportPage/apis/SessionDetailsAPI";

function VotingRoom() {
  const { sessionId } = useParams();
  const [userId, setUserId] = useState("");
  const [scrumMasterId, setScrumMasterId] = useState("");
  const [estimationId, setEstimationId] = useState(0);
  const [teamId, setTeamId] = useState(0);
  const [timer, setTimer] = useState("");
  const [currentUserStoryId, setCurrentUserStoryId] = useState<number>(0);

  const userIdd = localStorage.getItem("userId");

  useEffect(() => {
    if (sessionId)
      sessionDetailsData(parseInt(sessionId))
        .then((response: any) => {
          setEstimationId(response.data.estimationId);
          setScrumMasterId(response.data.scrumMasterId);
          setTeamId(response.data.teamId);
          console.log("response.data.estimationId", response.data.estimationId);
          console.log(typeof response.data.estimationId);
          setTimer(response.data.timer);
        })
        .catch((error) => {
          console.error("Error occurred while changing status :", error);
        });
  }, [sessionId, teamId]);

  useEffect(() => {
    setUserId(userIdd as string);
  }, [userIdd]);

  React.useEffect(() => {
    console.log("estimationId", estimationId);
  }, [estimationId]);

  React.useEffect(() => {
    console.log("timer");
    console.log(timer);
  }, [timer]);

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
        <Grid xs={12} sm={4} md={4} lg={4}>
          <RightComponent
            sessionId={sessionId as string}
            currentUserStoryId={currentUserStoryId}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default VotingRoom;
