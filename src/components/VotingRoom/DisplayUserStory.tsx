import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import { Book } from "lucide-react";
import { useSocket } from "../Socket/SocketContext";

interface userStoryType {
  roundNumber: number;
  storyPointResult: number;
  userStory: string;
  userStoryId: string;
  userStoryMappingId: string;
}
interface selectedUserStoryType {
  selectedUserStoryId: number;
  userStoryList: userStoryType[];
}
const DisplayUserStory: React.FC<selectedUserStoryType> = ({
  selectedUserStoryId,
  userStoryList,
}) => {
  const socket = useSocket();

  console.log("selectedUserStoryId from display", selectedUserStoryId);
  console.log("userStoryList from display", userStoryList);

  const [selectedUserStoryMappingId, setSelectedUserStoryMappingId] =
    useState<string>("");

  const [selectedUserStoryMappingName, setSelectedUserStoryMappingName] =
    useState<string>("");

  //   socket.on("userStoryMappingIdDeveloper", (userStoryMappingId) => {
  //     console.log("Received userStoryMappingIdDeveloper:", userStoryMappingId);
  //   });
  const [participants, setParticipants] = useState<string[]>([]);

  //   React.useEffect(() => {
  //     socket.on(
  //       "userStoryMappingIdDeveloper",
  //       ({
  //         userStoryMappingId,
  //         sessionId,
  //       }: {
  //         userStoryMappingId: string;
  //         sessionId: string;
  //       }) => {
  //         console.log(
  //           "Received userStoryMappingIdDeveloper:",
  //           userStoryMappingId,
  //           sessionId
  //         );
  //         setSelectedUserStoryMappingId(userStoryMappingId);
  //         setParticipants((prevParticipants) => [
  //           ...prevParticipants,
  //           userStoryMappingId,
  //         ]);
  //       }
  //     );

  //     return () => {
  //       // Clean up the socket listener when the component unmounts
  //       socket.off("userStoryMappingIdDeveloper");
  //     };
  //   }, [selectedUserStoryId]);

  React.useEffect(() => {
    const foundUserStory = userStoryList.find(
      (userStory) =>
        parseInt(userStory.userStoryMappingId) === selectedUserStoryId
    );
    console.log("foundUserStory");
    console.log(foundUserStory);
    console.log(foundUserStory?.userStory);
    setSelectedUserStoryMappingName(foundUserStory?.userStory as string);

    const ss = userStoryList.some(
      (userStory) =>
        parseInt(userStory.userStoryMappingId) === selectedUserStoryId
    );

    console.log("ss");
    console.log(ss);

    console.log("selectedUserStoryId");
    console.log(selectedUserStoryId);
  }, [selectedUserStoryId, userStoryList]);

  console.log("userStoryList");
  console.log(userStoryList);

  React.useEffect(() => {
    console.log("selectedUserStoryMappingId");
    console.log(selectedUserStoryMappingId);
  }, [selectedUserStoryMappingId]);

  React.useEffect(() => {
    console.log("participants");
    console.log(participants);
  }, [participants]);
  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        mt: 5,
        overflow: "auto",
      }}
    >
      <Typography level="title-lg" startDecorator={<Book />}>
        User Stories
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          //   display: "grid",
          gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
          gap: 1.5,
        }}
      >
        {selectedUserStoryMappingName === "" ||
        !selectedUserStoryMappingName ? (
          <p>No user story selected.</p>
        ) : (
          <>{selectedUserStoryMappingName}</>
        )}
      </CardContent>
    </Card>
  );
};

export default DisplayUserStory;
