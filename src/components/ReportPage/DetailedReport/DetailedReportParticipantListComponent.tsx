import { Card } from "@mui/joy";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/joy/Avatar";
import { ParticipantDataListResponsesParent } from "../../../pages/ReportPage/types";

const DetailedReportParticipantListComponent = ({
  participantData,
}: ParticipantDataListResponsesParent) => {
  // console.log("partivipnat data", participantData.data);
  // console.log("partivipnat data", typeof participantData.data);

  const participantDataArray = Object.values(participantData.data).map(
    (item) => ({
      userName: item.userName,
    })
  );

  return (
    <Card variant="outlined" color="primary">
      <Typography variant="h5" component="div" textAlign={"center"}>
        Participants
      </Typography>
      <CardContent style={{ maxHeight: "369px", overflowY: "auto" }}>
        <Table>
          <TableBody>
            {participantDataArray.map((item) => (
              <TableRow key={item.userName}>
                <TableCell>
                  <Avatar variant="soft">
                    {item.userName ? item.userName[0] : ""}
                  </Avatar>
                </TableCell>
                <TableCell>{item.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DetailedReportParticipantListComponent;
