import { Box, Typography } from "@mui/joy";
import React, { useState } from "react";
import UserStories from "./UserStories";
import Timer from "./Timer";
import CustomButtonGroup from "./CustonButtonGroup";
import VotingCards from "./VotingCards";
import CommentBox from "./CommentBox";

import DisplayUserStory from "./DisplayUserStory";
import getAllUserStoriesBySessionId from "./api/getAllUserStoriesBySessionId";
import { useSocket } from "../Socket/SocketContext";

interface propType {
  userId: string;
  sessionId: string;
  scrumMasterId: string;
  timer: string;
  estimationId: number;
  teamId: number;
  setCurrentUserStoryId: React.Dispatch<React.SetStateAction<number>>;
}
const LeftComponent = ({
  userId,
  sessionId,
  scrumMasterId,
  timer,
  estimationId,
  teamId,
  setCurrentUserStoryId,
}: propType) => {
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isTimerRunningSession, setIsTimerRunningSession] =
    useState<boolean>(true);
  const [selectedUserStoryId, setSelectedUserStoryId] = useState<number>(0);

  const [isStartButtonStarted, setIsStartButtonStarted] = useState(false);
  const [teamIdL, setTeamId] = useState(0);
  const [commentValue, setCommentValue] = useState<string>("");
  const [score, setScore] = useState<string>("");

  const role = localStorage.getItem("teamUserRole");

  const startTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  const stopTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  React.useEffect(() => {
    console.log("teamId from left,", teamId);
    setTeamId(teamId);
  }, [teamId]);

  React.useEffect(() => {
    console.log("isStartButtonStarted,", isStartButtonStarted);
    socket.emit("startVoting", sessionId, isStartButtonStarted);
  }, [isStartButtonStarted]);

  React.useEffect(() => {
    console.log("isTimerRunning");
    console.log(isTimerRunning);
    // setIsTimerRunningSession(isTimerRunning);
    const currentTime = new Date().toLocaleTimeString();
    socket.emit("timerSet", isTimerRunning, sessionId, currentTime);
  }, [isTimerRunning]);

  interface userStoryType {
    roundNumber: number;
    storyPointResult: number;
    userStory: string;
    userStoryId: string;
    userStoryMappingId: string;
  }
  const initialUserStory: userStoryType = {
    roundNumber: 0,
    storyPointResult: 0,
    userStory: "",
    userStoryId: "",
    userStoryMappingId: "",
  };

  const [userStoryList, setUserStoryList] = React.useState<userStoryType[]>([
    initialUserStory,
  ]);

  const [isUserStrorySelected, setIsUserStrorySelected] =
    useState<boolean>(false);

  React.useEffect(() => {
    getAllUserStoriesBySessionId(sessionId)
      .then((response: any) => {
        setUserStoryList(response.data);
        console.log("userStoryList:", userStoryList);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });
  }, [isUserStrorySelected]);

  const socket = useSocket();

  React.useEffect(() => {
    socket.emit("userStoryMappingId", selectedUserStoryId, sessionId);
    setCurrentUserStoryId(selectedUserStoryId);
  }, [sessionId, selectedUserStoryId]);

  const [participants, setParticipants] = useState<string[]>([]);
  const [selectedUserStoryMappingId, setSelectedUserStoryMappingId] =
    useState<string>("");

  React.useEffect(() => {
    socket.on(
      "userStoryMappingIdDeveloper",
      ({
        userStoryMappingId,
        sessionId,
      }: {
        userStoryMappingId: string;
        sessionId: string;
      }) => {
        console.log(
          "Received userStoryMappingIdDeveloper:",
          userStoryMappingId,
          sessionId
        );
        setSelectedUserStoryMappingId(userStoryMappingId);
        if (parseInt(userStoryMappingId) !== 0) setIsUserStrorySelected(true);
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          userStoryMappingId,
        ]);
      }
    );

    return () => {
      socket.off("userStoryMappingIdDeveloper");
    };
  }, [selectedUserStoryId]);

  React.useEffect(() => {
    console.log("selectedUserStoryMappingId");
    console.log(selectedUserStoryMappingId);
  }, [selectedUserStoryMappingId]);

  let testValue: number;
  React.useEffect(() => {
    console.log("selectedUserStoryId from left", selectedUserStoryId);
  }, [selectedUserStoryId]);

  testValue = selectedUserStoryId;

  React.useEffect(() => {
    socket.on("timerShow", ({ isTimerRunning, sessionId, currentTime }) => {
      console.log("timerShow");
      console.log("isTimerRunning", isTimerRunning);
      setIsTimerRunningSession(isTimerRunning);
      console.log("currentTime", currentTime);
    });
  }, [isTimerRunning]);

  return (
    <Box>
      {userId === scrumMasterId ? (
        <UserStories
          sessionId={sessionId}
          setSelectedUserStoryId={setSelectedUserStoryId}
          userStoryList={userStoryList}
        />
      ) : (
        <DisplayUserStory
          selectedUserStoryId={parseInt(selectedUserStoryMappingId)} // Directly pass selectedUserStoryId
          userStoryList={userStoryList}
        ></DisplayUserStory>
      )}

      {/* <Timer isRunning={isTimerRunning} /> */}
      <Timer isRunning={isTimerRunningSession} timer={timer} />

      {userId === scrumMasterId ? (
        <CustomButtonGroup
          onStartTimer={startTimer}
          stopTimer={stopTimer}
          isUserStrorySelected={isUserStrorySelected}
          setIsUserStrorySelected={setIsUserStrorySelected}
          setIsStartButtonStarted={setIsStartButtonStarted}
          sessionId={sessionId}
          selectedUserStoryId={parseInt(selectedUserStoryMappingId)}
          commentValue={commentValue}
          score={score}
        />
      ) : (
        <></>
      )}

      {userId === scrumMasterId ? (
        <>
          <CommentBox
            selectedUserStoryId={selectedUserStoryId}
            setCommentValue={setCommentValue}
            setScore={setScore}
            commentValue={commentValue}
            score={score}
          />
        </>
      ) : (
        <VotingCards
          estimationId={estimationId}
          selectedUserStoryId={parseInt(selectedUserStoryMappingId)}
          teamId={teamIdL}
          sessionId={sessionId}
        />
      )}
    </Box>
  );
};

export default LeftComponent;
