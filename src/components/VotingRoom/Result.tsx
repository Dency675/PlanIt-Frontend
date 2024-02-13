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

interface tablePropType {
  sessionId: string;
}

const Result: React.FC<tablePropType> = ({ sessionId }) => {
  const [showParticipantList, setShowParticipantList] = useState(true);
  const [participantStatus, setParticipantStatus] = useState<{
    [key: string]: boolean;
  }>({});

  const handleButtonClick = () => {
    setShowParticipantList(false);
  };

  const toggleStatus = (participantName: string) => {
    setParticipantStatus((prevStatus) => ({
      ...prevStatus,
      [participantName]: !prevStatus[participantName],
    }));
  };

  const participantData = [
    { name: "Participant 1" },
    { name: "Participant 2" },
    { name: "Participant 3" },
    { name: "Participant 4" },
    // Add more participant data as needed
  ];

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
                {participantData.map((participant, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" sx={{ paddingLeft: "8px" }}>
                      <Box
                        sx={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: participantStatus[participant.name]
                            ? "red"
                            : "green",
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: "8px",
                        }}
                      ></Box>
                      <IconButton
                        onClick={() => toggleStatus(participant.name)}
                      >
                        Hi
                      </IconButton>
                      {participant.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Button to show the other components */}
          <button onClick={handleButtonClick}>
            Show Result and Estimation
          </button>
        </>
      ) : (
        <>
          <Typography variant="h6">Result</Typography>
          <Divider orientation="horizontal" />
          <TableBox sessionId={sessionId} />
          <Typography variant="h6">Estimation</Typography>
          <Divider orientation="horizontal" />
          <PieChartResult />
        </>
      )}
    </Card>
  );
};

export default Result;
