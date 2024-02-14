// CreateRoomForm.tsx

import React, { useState } from "react";
import { Button, useTheme } from "@mui/joy/";
import RoomNameInput from "./RoomNameInput";
import EstimationScaleDropdown from "./EstimationScaleDropdown";
import FileSelector from "./FileSelector";
import TimerInput from "./TimerInput";
import GuestInput from "./GuestInput";
import { Drawer, useMediaQuery } from "@mui/material";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import SideNav from "../Navbar/SideNav";
import axios from "axios";
import { File } from "lucide-react";
import { Box } from "@mui/joy";
import fetchMembers from "./api/fetchTeamMembers";
import addSessionParticipants from "./api/addSessionParticipants";
import { useNavigate, useParams } from "react-router";

const CreateRoomForm: React.FC = () => {
  const { teamId } = useParams();
  const [userFile, setUserFile] = useState<File | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [sessionId, setSessionId] = useState<number>(0);
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    console.log("Selected file:", file);

    // Reset file-related states and messages
    setUserFile(file);
    setFileError("");

    // Set confirmation message only if it's a CSV file
    if (file.name.toLowerCase().endsWith(".csv")) {
      setFileUploadConfirmation("File has been selected, ready for upload!");
    } else {
      setFileError("File must be a CSV file");
      setFileUploadConfirmation(""); // Clear upload confirmation for non-CSV files
    }
  };

  React.useEffect(() => {
    setSelectedTeamId(teamId as string);
  }, []);

  const [teamMember, setTeamMember] = useState<
    { userId: string; roleId: number }[]
  >([{ userId: "", roleId: 0 }]);

  const storedUserId = localStorage.getItem("userId");

  const [roomNameError, setRoomNameError] = useState<string>("");
  const [estimationError, setEstimationError] = useState<string>("");
  const [timerError, setTimerError] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [fileUploadConfirmation, setFileUploadConfirmation] =
    useState<string>("");

  const [roomName, setRoomName] = useState<string>("");
  const [timer, setTimer] = useState<Date | null>(null);
  const [voteTime, setVoteTime] = useState<string>("");
  const [selectedUserArrayWithId, setSelectedUserArrayWithId] = React.useState<
    {
      userId: string;
      roleId: number;
    }[]
  >([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    let isValid = true;

    if (!roomName) {
      setRoomNameError("Room Name is required");
      isValid = false;
    } else {
      setRoomNameError("");
    }

    if (!selectedEstimationScale) {
      setEstimationError("Estimation Value is required");
      isValid = false;
    } else {
      setEstimationError("");
    }

    if (!timer) {
      setTimerError("Timer is required");
      isValid = false;
    } else {
      setTimerError("");
    }

    if (!userFile) {
      setFileError("File is required");
      isValid = false;
    } else if (!userFile.name.toLowerCase().endsWith(".csv")) {
      setFileError("File must be a CSV file");
      isValid = false;
    } else {
      setFileError("");
    }

    if (!isValid) {
      return;
    }

    navigate(`/teamSettings/${teamId}`);

    const formData = new FormData();
    formData.append("sessionTitle", roomName);
    formData.append("createDateTime", new Date().toLocaleDateString());
    formData.append("timer", voteTime);
    formData.append("teamId", selectedTeamId);
    formData.append("scrumMasterId", storedUserId as string);
    formData.append("estimationId", selectedEstimationScaleId.toString());
    formData.append("calculationId", "1");

    if (userFile) {
      formData.append("excelLink", userFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/addSessions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSessionId(response.data.data.id as number);

      // Show file upload confirmation
      setFileUploadConfirmation("File has been successfully uploaded!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    const combinedArray = [
      ...teamMember,
      ...selectedUserArrayWithId,
      { userId: storedUserId as string, roleId: 6 },
    ];

    addSessionParticipants({
      sessionId: sessionId,
      participants: combinedArray,
    })
      .then((response: any) => {
        console.log("Response from addSessionParticipants:", response);
      })
      .catch((error) => {
        console.error(
          "Error occurred while adding session participants:",
          error
        );
      });
  }, [sessionId]);

  React.useEffect(() => {
    fetchMembers(selectedTeamId)
      .then((response) => {
        console.log("Response from fetchMembers:", response);
        setTeamMember(response);
      })
      .catch((error) => {
        console.error(
          "Error occurred while adding session participants:",
          error
        );
      });
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedEstimationScale, setSelectedEstimationScale] =
    useState<string>("");
  const [selectedEstimationScaleId, setSelectedEstimationScaleId] =
    useState<number>(0);
  const [selectedCalculationMethod, setSelectedCalculationMethod] =
    useState<string>("");
  const [selectedCalculationMethodId, setSelectedCalculationMethodId] =
    useState<number>(0);

  React.useEffect(() => {
    console.log(" timer from room creation");
    if (timer) {
      const formattedTime = `00:${
        timer.getMinutes() < 10 ? "0" : ""
      }${timer.getMinutes()}:${
        timer.getSeconds() < 10 ? "0" : ""
      }${timer.getSeconds()}`;
      setVoteTime(formattedTime);
    }
  }, [timer]);

  React.useEffect(() => console.log(voteTime), [voteTime]);

  React.useEffect(() => {
    console.log(" selectedUserArrayWithId from room creation");
    console.log(selectedUserArrayWithId);
  }, [selectedUserArrayWithId]);

  React.useEffect(() => {
    console.log(" roomName from room creation");
    console.log(roomName);
  }, [roomName]);

  const [sessions, setSessions] = useState([]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
          <Grid md={"auto"}>
            {isSmallScreen ? (
              <Drawer variant="temporary"></Drawer>
            ) : (
              <Box></Box>
            )}
          </Grid>
          <Grid xs={16} md={12} px={3} pb={2} sx={{ flexGrow: 1 }} mx="auto">
            <Grid container alignItems="center" justifyContent="center">
              <Grid container mx="auto">
                <Card>
                  <Typography level="h2">Create Room</Typography>
                  <Grid container xs={11} mx="auto" spacing={3}>
                    <Grid
                      container
                      xs={12}
                      spacing={1}
                      direction="column"
                      alignItems="flex-start"
                    >
                      <Grid>
                        <Typography level="title-lg">Room Name</Typography>
                      </Grid>
                      <Grid xs={12}>
                        <RoomNameInput setRoomName={setRoomName} />
                        <Typography color="danger">{roomNameError}</Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      xs={12}
                      spacing={1}
                      direction="column"
                      alignItems="flex-start"
                    >
                      <Grid>
                        <Typography level="title-lg">
                          Estimation Value
                        </Typography>
                      </Grid>
                      <Grid xs={12}>
                        <Box width={"100%"}>
                          <EstimationScaleDropdown
                            setSelectedEstimationScale={
                              setSelectedEstimationScale
                            }
                            setSelectedEstimationScaleId={
                              setSelectedEstimationScaleId
                            }
                          />
                          <Typography color="danger">
                            {estimationError}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      xs={12}
                      spacing={1}
                      direction="column"
                      alignItems="flex-start"
                    >
                      <Grid>
                        <Typography level="title-lg">Add Guest</Typography>
                      </Grid>
                      <Grid xs={12}>
                        <GuestInput
                          setSelectedUserArrayWithId={
                            setSelectedUserArrayWithId
                          }
                        />
                        {/* Removed validation for Add Guest field */}
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="stretch"
                    >
                      <Grid xs={12} md={6}>
                        <Grid
                          container
                          spacing={1}
                          direction="column"
                          alignItems="flex-start"
                        >
                          <Grid>
                            <Typography level="title-lg">Set Timer</Typography>
                          </Grid>
                          <Grid>
                            <TimerInput setTimer={setTimer} />
                            <Typography color="danger">{timerError}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid xs={12} md={6}>
                        <Grid
                          container
                          spacing={1}
                          direction="column"
                          alignItems="flex-start"
                        >
                          <Grid>
                            <Typography level="title-lg">User Story</Typography>
                          </Grid>
                          <Grid>
                            <FileSelector onFileSelect={handleFileSelect} />
                            <Typography color="danger">{fileError}</Typography>
                            <Typography color="success">
                              {fileUploadConfirmation}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid xs={12} mt={2}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Button type="Create" color="success">
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateRoomForm;
