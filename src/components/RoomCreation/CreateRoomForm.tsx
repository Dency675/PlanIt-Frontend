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
import { time } from "console";
import axios from "axios";
import { File } from "lucide-react";
import { width } from "@mui/system";
import { Box } from "@mui/joy";
import CalculationMethodsDropdown from "./CalculationMethodsDropdown";

const CreateRoomForm: React.FC = () => {
  const [userFile, setUserFile] = useState<File | null>(null);

  const [userId, setUserId] = useState<string>("");

  const handleFileSelect = (file: File) => {
    console.log("Selected file:", file);
    setUserFile(file);
  };

  const storedUserId = localStorage.getItem("userId");
  console.log(" from local storage storedUserId");
  console.log(storedUserId);
  // setUserId(storedUserId as string);

  // React.useEffect(() => {
  //   console.log("userId from local storage");
  //   console.log(userId);
  // }, [userId]);

  // React.useEffect(() => {
  //   console.log("userFile");
  //   console.log(userFile);
  // }, [userFile]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("sessionTitle", roomName);
    formData.append("createDateTime", new Date().toLocaleDateString());
    formData.append("timer", voteTime);
    formData.append("teamId", "1");
    formData.append("scrumMasterId", storedUserId as string);
    formData.append("estimationId", selectedEstimationScaleId.toString());
    formData.append("calculationId", selectedCalculationMethodId.toString());

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
      console.log("Response:", response.data);
      console.log(response.data.data.id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
  const [roomName, setRoomName] = useState<string>("");
  const [timer, setTimer] = useState<Date | null>(null);
  const [voteTime, setVoteTime] = useState<string>("");

  const [selectedUserArrayWithId, setSelectedUserArrayWithId] = React.useState<
    {
      sessionId: number | null;
      userId: string;
      roleId: number;
    }[]
  >([]);

  // React.useEffect(() => {
  //   console.log(" selectedEstimation from room creation");
  //   console.log(selectedEstimationScale);
  //   console.log(selectedEstimationScaleId);
  // }, [selectedEstimationScale]);

  // React.useEffect(() => {
  //   console.log(" selectedCalculationMethod from room creation");
  //   console.log(selectedCalculationMethod);
  //   console.log(selectedCalculationMethodId);
  // }, [selectedCalculationMethod]);

  React.useEffect(() => {
    console.log(" timer from room creation");
    // console.log(timer);
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
            <Box
              pl={2}
              sx={{
                display: { xs: "none", md: "flex" },
                height: "100%",
              }}
            >
              <SideNav></SideNav>
            </Box>

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
                        <Typography level="title-lg">
                          Calculation method
                        </Typography>
                      </Grid>
                      <Grid xs={12}>
                        <Box width={"100%"}>
                          <CalculationMethodsDropdown
                            setSelectedCalculationMethod={
                              setSelectedCalculationMethod
                            }
                            setSelectedCalculationMethodId={
                              setSelectedCalculationMethodId
                            }
                          />
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
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid xs={12} mt={2}>
                      <Button type="Create" color="success">
                        Submit
                      </Button>
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
