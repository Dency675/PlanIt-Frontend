import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import MuiButtonGroup from "@mui/joy/ButtonGroup";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import { useSocket } from "../Socket/SocketContext";

interface CustomButtonGroupProps {
  onStartTimer: () => void;
  stopTimer: () => void;
  isUserStrorySelected: boolean;
  sessionId: string;
  setIsUserStrorySelected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStartButtonStarted: React.Dispatch<React.SetStateAction<boolean>>;
}
//timer function
const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({
  onStartTimer,
  stopTimer,
  isUserStrorySelected,
  setIsUserStrorySelected,
  setIsStartButtonStarted,
  sessionId,
}) => {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isRevealButtonDisabled, setIsRevealButtonDisabled] = useState(true);
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);
  const [isStartName, setIsStartName] = useState("Start Voting");

  const socket = useSocket();

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
      setIsStartName("End Voting");
      setIsStartButtonStarted(true);
      socket.emit("startButtonClicked", sessionId);
    }
    setIsTimerOn(!isTimerOn);
  };

  const handleRevelButtonClick = () => {
    socket.emit("revealClicked", sessionId);
  };

  const handleSaveButtonClick = () => {
    setIsRevealButtonDisabled(!isRevealButtonDisabled);
    setIsUserStrorySelected(false);
    setIsStartButtonDisabled(!isStartButtonDisabled);
    setIsStartName("Start Voting");
  };

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
            {/* {isTimerOn ? "End Voting" : "Start Voting"} */}
            {isStartName}
          </Button>
          <Button
            disabled={isRevealButtonDisabled}
            onClick={handleRevelButtonClick}
          >
            Reveal
          </Button>
          <Button disabled={isRevealButtonDisabled}>Skip</Button>
          <Button
            disabled={isRevealButtonDisabled}
            onClick={handleSaveButtonClick}
          >
            Save Result
          </Button>
          <Button>Exit</Button>
        </MuiButtonGroup>
      </CardContent>
    </Card>
  );
};

export default CustomButtonGroup;
