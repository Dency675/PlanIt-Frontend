import Card from "@mui/joy/Card";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ParticipantScore, UserStory } from "../../../pages/ReportPage/types";

interface UserStoryParicipantComponentProps {
  participantScores: ParticipantScore[];
}

const UserStoryParicipantComponent = ({
  participantScores,
}: UserStoryParicipantComponentProps) => {
  console.log("participantScores", participantScores);
  // console.log(
  //   "4",
  //   participantScoreData[0].participantScores[0].participantName
  // );

  return (
    <Card
      style={{ width: 900, border: "0.5px solid #9DBEFF" }}
      variant="outlined"
    >
      <TableContainer style={{ maxHeight: 200, overflowY: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#FFFFFF",
                  zIndex: 1,
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#FFFFFF",
                  zIndex: 1,
                }}
              >
                Story point
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(participantScores).map((participant, index) => (
              <TableRow
                key={index}
                sx={{ "&:hover": { backgroundColor: "#FEF0C0" } }}
              >
                <TableCell>{participant.participantName}</TableCell>
                <TableCell>{participant.storyPoint}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default UserStoryParicipantComponent;
