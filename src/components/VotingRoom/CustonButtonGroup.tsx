import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import MuiButtonGroup from "@mui/joy/ButtonGroup";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import { useSocket } from "../Socket/SocketContext";
import { resetStoryPoint } from "../../pages/VotingRoom/apis/resetStoryPoint";
import updateUserStoryMapping from "./api/updateUserStoryMapping";
import editSessions from "../TeamSettings/api/editSessions";
import { useNavigate } from "react-router";

interface CustomButtonGroupProps {
  onStartTimer: () => void;
  stopTimer: () => void;
  isUserStrorySelected: boolean;
  sessionId: string;
  setIsUserStrorySelected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStartButtonStarted: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUserStoryId: number;
  commentValue: string;
  score: string;
  setScore: React.Dispatch<React.SetStateAction<string>>;
  setCommentValue: React.Dispatch<React.SetStateAction<string>>;
  setIsUserStorySelectEnable: React.Dispatch<React.SetStateAction<boolean>>;
}
//timer function
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
    console.log("isUserStrorySelected", isUserStrorySelected);
    console.log(isUserStrorySelected);
    setIsStartButtonDisabled(isUserStrorySelected);
  }, [isUserStrorySelected]);

  const handleButtonClick = () => {
    if (isTimerOn) {
      setIsTimerOn(!isTimerOn);
      onStartTimer();
      setIsRevealButtonDisabled(false);
      setIsStartName("Start Voting");
      setIsStartButtonStarted(false);
    } else {
      stopTimer();
      setIsRevealButtonDisabled(true);
      setIsSaveButtonDisabled(true);
      setIsStartName("End Voting");
      setIsStartButtonStarted(true);
      socket.emit("startButtonClicked", sessionId, count);
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
    console.log(
      "isRevealButtonDisabled",
      isRevealButtonDisabled,
      isRevealButtonDisabled === false
    );

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
          {/* <Button disabled={isRevealButtonDisabled}>Skip</Button> */}
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
