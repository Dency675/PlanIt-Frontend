import { Box, Card } from "@mui/joy";
import CardHeader from "@mui/material/CardHeader";
import { Clock } from "lucide-react";
import React from "react";
import { UserStoryTitleAndPointResponse } from "../../../pages/ReportPage/types";

interface UserStoryProps {
  index: number;
  userStoryData: UserStoryTitleAndPointResponse;
}

const UserStoryScoreComponent = ({ userStoryData, index }: UserStoryProps) => {
  return (
    <Card
      variant="outlined"
      color="primary"
      style={{
        width: 200,
        height: 195,
        border: "1px solid  #9DBEFF",
        padding: 0,
        marginTop: 9,
      }}
    >
      <Box
        style={{
          marginTop: 35,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Clock size={85} />
        <CardHeader
          title={`Story Point : ${userStoryData[index].storyPointResult}`}
        />
      </Box>
    </Card>
  );
};

export default UserStoryScoreComponent;
