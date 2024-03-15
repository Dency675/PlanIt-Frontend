import React, { useState } from "react";
import {
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  useTheme,
} from "@mui/joy/";

// import Template from "../../assets/userStoryTemplate/Template.csv"
import RoomNameInput from "./RoomNameInput";
import EstimationScaleDropdown from "./EstimationScaleDropdown";
import FileSelector from "./FileSelector";
import TimerInput from "./TimerInput";
import GuestInput from "./GuestInput";
import { Drawer, useMediaQuery } from "@mui/material";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import axios, { AxiosResponse } from "axios";
import { Box } from "@mui/joy";
import fetchMembers from "./api/fetchTeamMembers";
import addSessionParticipants from "./api/addSessionParticipants";
import { useNavigate, useParams } from "react-router";
import addUserStoriesAndSessionMapping from "./api/addUserStoriesAndSessionMapping";
import JiraProjectDropdown from "./JiraProjectDropdown";
import JiraSprintDropdown from "./JiraSprintDropdown";
import { useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

const CreateRoomForm: React.FC = () => {
  // const { teamId } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get("id");

  const [userFile, setUserFile] = useState<File | null>(null);
  const [jiraImport, setJiraImport] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [sessionId, setSessionId] = useState<number>(0);
  const [responseResponse, setResponse] = useState<number>();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const navigate = useNavigate();

  const csvData = `Id,Summary,Issue key,Issue id `;

  const [userDetails, setUserDetails] = useState<any>(null);
  const [userProjects, setUserProjects] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<any>(null);
  const [projectData, setProjectData] = useState<any>(null);
  const [issues, setIssues] = React.useState<any[]>([]);

  const [formattedIssues, setFormattedIssues] = React.useState<
    // { userStoryId: string; userStory: string }[]
    {
      userStoryId: string;
      userStory: string;
      description: string;
      issueKey: string;
    }[]
  >([]);

  interface Sprint {
    id: number;
    name: string;
  }
  const [sprints, setSprints] = React.useState<Sprint[]>([]);

  React.useEffect(() => {
    console.log("formattedIssues", formattedIssues);
    console.log("userFile", userFile);
  }, [formattedIssues]);
  React.useEffect(() => {
    // Add logic to handle redirection after Jira authentication
    // For example, you can check if the URL contains the code or any relevant information
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    console.log("code", code);

    if (code) {
      // Make a request to the server to exchange the code for access token and fetch user details
      axios
        .get(`http://localhost:3001/auth/callback?code=${code}&id=${teamId}`)
        .then((response) => {
          // Data received from the server after successful authentication
          setUserDetails(response.data.UserData);
          setUserProjects(response.data.ProjectData);
          setProjectData(response.data.projects);
          setAccessToken(response.data.tokenResponse.access_token);

          console.log("response", response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          // Handle error or redirect to an error page
        });
    } else {
      // Handle redirection failure or invalid code
      console.error("Invalid code");
    }
  }, []);

  const handleUploadFileClick = () => {
    setUploadModalOpen(true);
  };

  const handleImportFromJiraClick = async () => {
    window.location.href = `http://localhost:3001/auth/jira/${teamId}`;
  };

  const handleDownloadTemplateClick = () => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "template.csv");
    link.click();

    // setTimeout(() => {
    //   window.URL.revokeObjectURL(url);
    // }, 1000);
  };

  const handleClearFileUpload = () => {
    setUserFile(null);
  };

  const handleClearJiraData = () => {
    setProjectData(null);
  };

  const handleFileSelect = (file: File) => {
    console.log("Selected file:", file);
    // Reset file-related states and messages
    setUserFile(file);
    setFileError("");

    // Set confirmation message only if it's a CSV file
    if (file.name.toLowerCase().endsWith(".csv")) {
      setFileUploadConfirmation(file.name);
    } else {
      setFileError("File must be a CSV file");
      setFileUploadConfirmation("");
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
  const [userStoryError, setUserStoryError] = useState<string>("");
  const [fileUploadConfirmation, setFileUploadConfirmation] =
    useState<string>("");

  const [fileName, setFileName] = useState<string>("");
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

    if (formattedIssues.length !== 0 || userFile) {
      console.log("userFile", userFile);
      console.log("formattedIssues", formattedIssues);
      setUserStoryError("");
    } else {
      setUserStoryError("Upload user story through file or jira ");
    }

    if (!userFile) {
      if (formattedIssues.length === 0) {
        setFileError("File is required");
        isValid = false;
      }
    } else if (!userFile.name.toLowerCase().endsWith(".csv")) {
      setFileError("File must be a CSV file");
      isValid = false;
    } else {
      setFileError("");
      setUserStoryError("");
    }

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("sessionTitle", roomName);
    formData.append("createDateTime", new Date().toISOString());
    formData.append("timer", voteTime);
    formData.append("teamId", selectedTeamId);
    formData.append("scrumMasterId", storedUserId as string);
    formData.append("estimationId", selectedEstimationScaleId.toString());
    formData.append("calculationId", "1");

    console.log(userFile);
    if (userFile !== null) {
      formData.append("excelLink", userFile);
    } else if (formattedIssues.length !== 0) {
      formData.append("excelLink", "jira");
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
      navigate(`/teamSettings/${teamId}`);
      console.log(response);
      setResponse(response.status as number);

      console.log(
        "SessionIdsuccessfully ",
        response.data.responseData.data.newSession.id as number
      );
      setSessionId(response.data.responseData.data.newSession.id as number);
      console.log("SessionId", response.data.responseData.data.fileName);
      setFileName(response.data.responseData.data.fileName as string);

      setFileUploadConfirmation("File has been successfully uploaded!");

      const ResponseStatus = response.status as number;
      const currentSessionId = response.data.responseData.data.newSession.id;
      const selectedTeamIds = response.data.responseData.data.newSession.id;

      console.log(ResponseStatus, "responseResponse");

      if ((response.status as number) === 201) {
        // if (response.data.responseData.data.fileName !== "") {
        // addUserStoriesAndSessionMapping(
        //   response.data.responseData.data.fileName,
        //   response.data.responseData.data.newSession.id
        // )
        //   .then((response: any) => {
        //     console.log("Response from addSessionParticipants:", response);
        //     const combinedArray = [
        //       ...teamMember,
        //       ...selectedUserArrayWithId,
        //       { userId: storedUserId as string, roleId: 6 },
        //     ];

        //     console.log(combinedArray, "combinedArray");

        //     // addSessionParticipants({
        //     //   sessionId: currentSessionId,
        //     //   participants: combinedArray,
        //     // })
        //     //   .then((response: any) => {
        //     //     console.log("Response from addSessionParticipants:", response);
        //     //   })
        //     //   .catch((error) => {
        //     //     console.error(
        //     //       "Error occurred while adding session participants:",
        //     //       error
        //     //     );
        //     //   });
        //   })
        //   .catch((error) => {
        //     console.error(
        //       "Error occurred while adding session participants:",
        //       error
        //     );
        //   });
        // }

        try {
          if (response.data.responseData.data.fileName !== "") {
            const addUserStoriesAndSessionMappingResponse =
              await addUserStoriesAndSessionMapping(
                response.data.responseData.data.fileName,
                response.data.responseData.data.newSession.id
              );
            console.log(
              "Response from addUserStoriesAndSessionMapping:",
              addUserStoriesAndSessionMappingResponse
            );
          } else {
            const userStories = formattedIssues.map((issue) => issue.userStory);

            const addUserStoriesAndSessionMappingResponse = await axios.post(
              "http://localhost:3001/addUserStories",
              {
                userStories: formattedIssues,
                sessionId: response.data.responseData.data.newSession.id,
              }
            );

            console.log(
              "Response from addUserStoriesAndSessionMapping:",
              addUserStoriesAndSessionMappingResponse
            );
          }

          const combinedArray = [
            ...teamMember,
            ...selectedUserArrayWithId,
            { userId: storedUserId as string, roleId: 6 },
          ];

          console.log(combinedArray, "combinedArray");

          try {
            const addParticipantsResponse = await addSessionParticipants({
              sessionId: currentSessionId,
              participants: combinedArray,
            });
            console.log(
              "Response from addSessionParticipants:",
              addParticipantsResponse
            );
          } catch (error) {
            console.error(
              "Error occurred while adding session participants:",
              error
            );
          }
        } catch (error) {
          console.error(
            "Error occurred while adding session participants:",
            error
          );
        }

        if (response.status === 200) {
          const combinedArray = [
            ...teamMember,
            ...selectedUserArrayWithId,
            { userId: storedUserId as string, roleId: 6 },
          ];

          console.log(combinedArray, "combinedArray");

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
        }
      }
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
  }, [sessionId, fileName]);

  React.useEffect(() => {
    fetchMembers(selectedTeamId, storedUserId as string)
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
  }, [selectedTeamId]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedEstimationScale, setSelectedEstimationScale] =
    useState<string>("");
  const [selectedEstimationScaleId, setSelectedEstimationScaleId] =
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
                      </Grid>
                    </Grid>
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

                    <Grid container xs={12} spacing={1} justifyContent="start">
                      <Grid
                        container
                        spacing={1}
                        direction="column"
                        alignItems="flex-start"
                      >
                        <Grid>
                          <Typography level="title-lg">User Story :</Typography>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Button
                          disabled={projectData !== null}
                          onClick={handleUploadFileClick}
                        >
                          Upload File
                        </Button>
                        {userFile && (
                          <Typography color="success">
                            {fileUploadConfirmation}
                            <Button
                              variant="plain"
                              color="neutral"
                              onClick={handleClearFileUpload}
                            >
                              <ClearIcon fontSize="small" />
                            </Button>
                          </Typography>
                        )}
                        {/* <FileSelector onFileSelect={handleFileSelect} />
                        <Typography color="danger">{fileError}</Typography>
                        <Typography color="success">
                          {fileUploadConfirmation}
                        </Typography> */}
                      </Grid>
                      <Grid container spacing={1} direction="column">
                        <Grid>
                          <Button
                            disabled={userFile !== null}
                            onClick={handleImportFromJiraClick}
                          >
                            Import from Jira
                          </Button>
                          {projectData && (
                            <Typography color="success">
                              <Button
                                variant="plain"
                                color="neutral"
                                onClick={handleClearJiraData}
                              >
                                Clear data from Jira {"   "}
                                <ClearIcon fontSize="small" />
                              </Button>
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                      <Grid sx={{ marginLeft: 14 }}>
                        {" "}
                        <Typography color="danger">{userStoryError}</Typography>
                      </Grid>
                    </Grid>

                    <Grid xs={12} mt={2}>
                      {projectData && (
                        <>
                          {" "}
                          <Divider>Jira</Divider>
                          <Grid
                            sx={{
                              paddingTop: "10px",
                            }}
                          >
                            <Typography level="title-lg">
                              Select Project
                            </Typography>
                            <JiraProjectDropdown
                              projects={userProjects}
                              accessToken={accessToken}
                              projectData={projectData}
                              setSprints={setSprints}
                            />
                          </Grid>
                          {sprints.length !== 0 && (
                            <Grid
                              sx={{
                                paddingTop: "15px",
                              }}
                            >
                              <Typography level="title-lg">
                                Select Sprint
                              </Typography>
                              <JiraSprintDropdown
                                accessToken={accessToken}
                                sprints={sprints}
                                setIssues={setIssues}
                                setFormattedIssues={setFormattedIssues}
                              />
                            </Grid>
                          )}
                        </>
                      )}
                      <Grid
                        sx={{
                          paddingTop: "20px",
                        }}
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
      <Modal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload File"
      >
        <ModalDialog>
          <ModalClose />
          <Button
            variant="outlined"
            color="neutral"
            onClick={handleDownloadTemplateClick}
          >
            Download Template
          </Button>
          <FileSelector onFileSelect={handleFileSelect} />
          <Typography color="danger">{fileError}</Typography>
          {userFile && (
            <Typography color="success">{fileUploadConfirmation}</Typography>
          )}
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default CreateRoomForm;
