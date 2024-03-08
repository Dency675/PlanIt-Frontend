import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import Typography from "@mui/joy/Typography";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Book } from "lucide-react";
import { Select, SelectChangeEvent } from "@mui/material";
import { selectClasses } from "@mui/joy/Select";
import { MenuItem } from "@mui/material";
import { sessionIdType } from "./types";

export const modifyUserStoryIdInCurrentStateInStorage = async (
  sessionId: string,
  selectedUserStoryId: number
) => {
  try {
    const meetingDataString = localStorage.getItem(`sessionData${sessionId}`);
    let meetingData;

    if (meetingDataString) {
      try {
        meetingData = JSON.parse(meetingDataString);
      } catch (error) {
        console.error("Error parsing meeting data:", error);
      }
    }

    if (meetingData) {
      meetingData.selectedUserStoryId = selectedUserStoryId;
    }

    localStorage.setItem(
      `sessionData${sessionId}`,
      JSON.stringify(meetingData)
    );

    console.log(`Current state for session ${sessionId} stored successfully.`);
  } catch (error) {
    console.error("Error setting current state in storage:", error);
  }
};

const UserStories: React.FC<sessionIdType> = ({
  sessionId,
  setSelectedUserStoryId,
  userStoryList,
  isUserStorySelectEnable,
}) => {
  const HandleUserStoryChange = async (e: SelectChangeEvent<string>) => {
    const selectedUserStoryName = e.target.value as string;
    console.log(selectedUserStoryName);
    const selectedUserStory = userStoryList.find(
      (item) => item.userStory === selectedUserStoryName
    );
    if (selectedUserStory) {
      console.log(selectedUserStory.userStoryMappingId);
      setSelectedUserStoryId(parseInt(selectedUserStory.userStoryMappingId));
      await modifyUserStoryIdInCurrentStateInStorage(
        sessionId,
        parseInt(selectedUserStory.userStoryMappingId)
      );
    }
  };

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
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: "1/-1" }}>
          <Select
            placeholder="Select user story"
            fullWidth
            size="small"
            onChange={HandleUserStoryChange}
            IconComponent={KeyboardArrowDown}
            sx={{
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
            displayEmpty
            inputProps={{ readOnly: isUserStorySelectEnable }}
          >
            {userStoryList.map((item, index) => (
              <MenuItem key={index} value={item.userStory}>
                {item.userStory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};
export default UserStories;
