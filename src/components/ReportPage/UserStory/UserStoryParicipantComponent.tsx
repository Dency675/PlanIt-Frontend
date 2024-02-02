import Card from "@mui/joy/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const UserStoryParicipantComponent = () => {
  const participants = [
    { name: "Participant 1", score: 95 },
    { name: "Participant 2", score: 88 },
    { name: "Participant 3", score: 72 },
    { name: "Participant 4", score: 87 },
    { name: "Participant 5", score: 94 },
    { name: "Participant 6", score: 78 },
    { name: "Participant 7", score: 91 },
    { name: "Participant 8", score: 85 },
    { name: "Participant 9", score: 79 },
    { name: "Participant 10", score: 93 },
    // Add more participants as needed
  ];
  return (
    <Card
      style={{ width: 900, border: "0.5px solid #9DBEFF" }}
      variant="outlined"
    >
      <TableContainer style={{ maxHeight: 200, overflowY: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow
                key={index}
                sx={{ "&:hover": { backgroundColor: "#FEF0C0" } }}
              >
                <TableCell>{participant.name}</TableCell>
                <TableCell>{participant.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default UserStoryParicipantComponent;
