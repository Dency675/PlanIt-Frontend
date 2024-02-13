import React from "react";
import { Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import TableBox from "./TableBox";
import { PieChart } from "@mui/x-charts";
import PieChartResult from "./PieChartResult";

const dummyParticipants = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Anderson",
  "Eva Davis",
];

const ParticipantList = () => {
  return (
    <div
      style={{
        maxHeight: "max-content",
        maxWidth: "100%",
        margin: "0 3px 5px", // Equivalent to mx: 3, my: 5
        height: 500,
        overflow: "auto",
      }}
    >
      <Typography level="title-lg">Participants</Typography>
      <Divider orientation="horizontal" />
      <ul>
        {dummyParticipants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
