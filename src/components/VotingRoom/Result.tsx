import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import TableBox from "./TableBox";
import { PieChart } from "@mui/x-charts";
import PieChartResult from "./PieChartResult";
import ParticipantList from "./participantList";
import { useSocket } from "../Socket/SocketContext";
import { DeveloperListAPI } from "../../pages/VotingRoom/apis/DeveloperListAPI";
import { resetStoryPoint } from "../../pages/VotingRoom/apis/resetStoryPoint";

interface tablePropType {
  sessionId: string;
  currentUserStoryId: number;
}

interface Participant {
  name: string;
  status: boolean;
  teamMemberId: string;
}

interface UserData {
  userName: string;
  roleId: number;
  teamMemberId: number;
  status: boolean;
}

const Result: React.FC<tablePropType> = ({ sessionId, currentUserStoryId }) => {
  const [showParticipantList, setShowParticipantList] = useState(true);
  const [scoreCounts, setScoreCounts] = useState<{ [key: string]: number }>({});
  const [userStoryNumber, setUserStoryNumber] = useState<number>(0);
  const [participantsData, setParticipantData] = useState<UserData[]>([
    { userName: "", status: false, teamMemberId: 0, roleId: 0 },
  ]);

  const socket = useSocket();

  React.useEffect(() => {
    socket.on("showResult", async (sessionId, selectedUserStoryId) => {
      console.log("showResult", sessionId, selectedUserStoryId);

      setUserStoryNumber(selectedUserStoryId);
      setShowParticipantList(false);
    });

    return () => {
      socket.off("showResult");
    };
  }, []);

  // React.useEffect(() => {
  //   setUserStoryNumber(currentUserStoryId);
  // }, [currentUserStoryId]);

  React.useEffect(() => {
    socket.on("showParticipants", async (sessionId, count) => {
      if (count > 0) {
        resetStoryPoint(currentUserStoryId)
          .then((response: any) => {
            console.log("session status is ", response);
          })
          .catch((error) => {
            console.error("Error occurred while changing status :", error);
          });
      }
      setShowParticipantList(true);

      const formattedData = participantsData.map((participant: any) => ({
        ...participant,
        status: false,
      }));
      setParticipantData(formattedData);
    });

    return () => {
      socket.off("showParticipants");
    };
  }, [socket, participantsData]);

  React.useEffect(() => {
    socket.on("userVotedAdded", async (sessionId, teamMemberId) => {
      console.log("userVotedAdded", sessionId, teamMemberId);
      toggleStatus(teamMemberId);
    });

    return () => {
      socket.off("userVotedAdded");
    };
  }, [socket]);

  React.useEffect(() => {
    console.log(
      "Developer List from result:participantsData",
      participantsData
    );
  }, [participantsData]);

  React.useEffect(() => {
    DeveloperListAPI(parseInt(sessionId))
      .then((response: any) => {
        const formattedData = response.data.map((developer: any) => ({
          ...developer,
          status: false,
        }));
        setParticipantData(formattedData);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });
  }, [sessionId]);

  const toggleStatus = (teamMemberId: number) => {
    setParticipantData((prevData) => {
      return prevData.map((participant) => {
        if (participant.teamMemberId === teamMemberId) {
          console.log(
            "Developer List from result participant.status:",
            participant.status
          );
          return { ...participant, status: !participant.status };
        }
        console.log("participantsData", participantsData);
        return participant;
      });
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: 3,
        my: 5,
        height: 500,
        overflow: "auto",
      }}
    >
      {showParticipantList ? (
        <>
          <Typography variant="h6">Participant List</Typography>
          <Divider orientation="horizontal" />
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {participantsData.map((participant, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" sx={{ paddingLeft: "10px" }}>
                      <Box
                        sx={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: participant.status ? "green" : "red",
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: "10px",
                        }}
                      ></Box>
                      {participant.userName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <Typography variant="h6">Result</Typography>
          <Divider orientation="horizontal" />
          <TableBox
            sessionId={sessionId}
            currentUserStoryId={userStoryNumber}
            setScoreCounts={setScoreCounts}
          />
          <Typography variant="h6">Estimation</Typography>
          <Divider orientation="horizontal" />
          <PieChartResult scoreCounts={scoreCounts} />
        </>
      )}
    </Card>
  );
};

export default Result;
