import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import { Book } from "lucide-react";
import { useSocket } from "../Socket/SocketContext";
import { selectedUserStoryType } from "./types";

const DisplayUserStory: React.FC<selectedUserStoryType> = ({
  selectedUserStoryId,
  userStoryList,
}) => {
  const socket = useSocket();

  const [selectedUserStoryMappingId, setSelectedUserStoryMappingId] =
    useState<string>("");

  const [selectedUserStoryMappingName, setSelectedUserStoryMappingName] =
    useState<string>("");

  const [participants, setParticipants] = useState<string[]>([]);

  React.useEffect(() => {
    const foundUserStory = userStoryList.find(
      (userStory) =>
        parseInt(userStory.userStoryMappingId) === selectedUserStoryId
    );

    setSelectedUserStoryMappingName(foundUserStory?.userStory as string);

    const ss = userStoryList.some(
      (userStory) =>
        parseInt(userStory.userStoryMappingId) === selectedUserStoryId
    );
  }, [selectedUserStoryId, userStoryList]);

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
