import React from "react";
import { Card } from "@mui/joy";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/joy/Avatar";

const participants = [
  "John",
  "Hariprasad J",
  "Bob",
  "John",
  "Jane",
  "Bob",
  "John",
  "Jane",
  "Bob",
  "John",
  "Jane",
  "Bob",
  "John",
  "Jane",
  "Bob",
  "John",
  "John",
  "ddddd",
];

const DetailedReportParticipantListComponent = () => {
  return (
    <Card variant="outlined" color="primary">
      <Typography variant="h5" component="div" textAlign={"center"}>
        Participants
      </Typography>
      <CardContent style={{ maxHeight: "369px", overflowY: "auto" }}>
        <Table>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar variant="soft">{participant[0]}</Avatar>
                </TableCell>
                <TableCell>{participant}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DetailedReportParticipantListComponent;
