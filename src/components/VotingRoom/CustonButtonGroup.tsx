import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import MuiButtonGroup from "@mui/joy/ButtonGroup";
import { useState } from "react";
import { useSocket } from "../Socket/SocketContext";
import updateUserStoryMapping from "./api/updateUserStoryMapping";
import editSessions from "../TeamSettings/api/editSessions";
import { useNavigate } from "react-router";
import { CustomButtonGroupProps } from "./types";
import axios from "axios";

export const modifyStartVotingInCurrentStateInStorage = async (
  sessionId: string,
  isVotingStarted: boolean
) => {
  try {
    const meetingDataString = localStorage.getItem(`sessionData${sessionId}`);
    let meetingData;

    if (meetingDataString) {
      try {
        meetingData = JSON.parse(meetingDataString);
      } catch (error) {
        console.error("Error parsing meeting data:", error);
      }
    }

    if (meetingData) {
      meetingData.isVotingStarted = isVotingStarted;
      meetingData.currentTime = new Date()
        .toISOString()
        .split("T")[1]
        .substring(0, 8);
    }

    localStorage.setItem(
      `sessionData${sessionId}`,
      JSON.stringify(meetingData)
    );

    console.log(`Current state for session ${sessionId} stored successfully.`);
  } catch (error) {
    console.error("Error setting current state in storage:", error);
  }
};

const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({
  onStartTimer,
  stopTimer,
  isUserStrorySelected,
  setIsUserStrorySelected,
  setIsStartButtonStarted,
  sessionId,
  selectedUserStoryId,
  commentValue,
  score,
  setScore,
  setCommentValue,
  setIsUserStorySelectEnable,
  userStoryList,
}) => {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isRevealButtonDisabled, setIsRevealButtonDisabled] = useState(true);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);
  const [count, setCount] = useState(0);
  const [isStartName, setIsStartName] = useState("Start Voting");

  const socket = useSocket();
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsStartButtonDisabled(isUserStrorySelected);
  }, [isUserStrorySelected]);

  const handleButtonClick = async () => {
    if (isTimerOn) {
      setIsTimerOn(!isTimerOn);
      onStartTimer();
      setIsRevealButtonDisabled(false);
      setIsStartName("Start Voting");
      setIsStartButtonStarted(false);
      await modifyStartVotingInCurrentStateInStorage(sessionId, false);
    } else {
      stopTimer();
      setIsRevealButtonDisabled(true);
      setIsSaveButtonDisabled(true);
      setIsStartName("End Voting");
      setIsStartButtonStarted(true);
      socket.emit("startButtonClicked", sessionId, count);
      await modifyStartVotingInCurrentStateInStorage(sessionId, true);
      setIsUserStorySelectEnable(true);

      setCount(count + 1);
    }

    setIsTimerOn(!isTimerOn);
  };

  const handleRevelButtonClick = () => {
    setIsSaveButtonDisabled(false);
    socket.emit("revealClicked", sessionId, selectedUserStoryId);
  };

  const handleSaveButtonClick = () => {
    if (score !== "" && commentValue !== "") {
      setIsRevealButtonDisabled(!isRevealButtonDisabled);
      setIsSaveButtonDisabled(true);
      setIsUserStrorySelected(false);
      setIsStartButtonDisabled(!isStartButtonDisabled);
      setIsStartName("Start Voting");

      updateUserStoryMapping(selectedUserStoryId, commentValue, score, count)
        .then((response: any) => {})
        .catch((error) => {
          console.error("Error occurred while changing status :", error);
        });

      const foundUserStory = userStoryList.find(
        (userStory) =>
          parseInt(userStory.userStoryMappingId) === selectedUserStoryId
      );

      console.log("issueKey", foundUserStory?.userStoryKey);
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      console.log("code", code);

      if (code) {
        axios
          .post(
            `http://localhost:3001/auth/saveToJira?code=${code}&sessionId=${sessionId}`,
            {
              issueKey: foundUserStory?.userStoryKey,
              storyPointValue: score,
              cloudId: "8041d251-f1c4-4732-a7ea-2680b867ceaf",
            }
          )
          .then((response) => {
            console.log("response", response);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });

        // axios
        //   .put(
        //     `http://localhost:3001/postStoryPoint?code=${code}&sessionId=${sessionId}`,
        //     {
        //       issueKey: "SCRUM-1",
        //       storyPointValue: score,
        //       cloudId: "8041d251-f1c4-4732-a7ea-2680b867ceaf",
        //     }
        //   )
        //   .then((response) => {
        //     console.log("response", response.data);
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching user details:", error);
        // // Handle error or redirect to an error page
        // });
      } else {
        // Handle redirection failure or invalid code
        console.error("Invalid code");
      }

      setIsUserStorySelectEnable(false);

      socket.emit("resultSaved", sessionId);
    }
    socket.emit("saveResultClicked", sessionId);
  };

  const handleExitButtonClick = () => {
    editSessions(parseInt(sessionId), "completed")
      .then((response: any) => {
        console.log("session status is ", response);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });

    socket.emit("sessionEnded", sessionId);
  };

  React.useEffect(() => {
    socket.on("exitUsers", () => {
      navigate(`/home`);
    });
  }, []);

  React.useEffect(() => {
    if (isRevealButtonDisabled === false) setIsStartName("Re-voting");
  }, [isRevealButtonDisabled]);
  return (
    <Card
      variant="outlined"
      sx={{
        mx: 6,
        mt: 2,
        width: "85%",
        overflow: "auto",
      }}
    >
      <CardContent sx={{ textAlign: "center", alignItems: "center" }}>
        <MuiButtonGroup
          variant="soft"
          aria-label="outlined primary button group"
          buttonFlex="0 1 200px"
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <Button disabled={!isStartButtonDisabled} onClick={handleButtonClick}>
            {isStartName}
          </Button>
          <Button
            disabled={isRevealButtonDisabled}
            onClick={handleRevelButtonClick}
          >
            Reveal
          </Button>
          <Button
            disabled={isSaveButtonDisabled}
            onClick={handleSaveButtonClick}
          >
            Save Result
          </Button>
          <Button onClick={handleExitButtonClick}>Exit</Button>
        </MuiButtonGroup>
      </CardContent>
    </Card>
  );
};

export default CustomButtonGroup;
