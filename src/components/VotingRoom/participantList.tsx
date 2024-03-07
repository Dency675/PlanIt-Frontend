import { Typography } from "@mui/joy";
import Divider from "@mui/joy/Divider";

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
        margin: "0 3px 5px",
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
