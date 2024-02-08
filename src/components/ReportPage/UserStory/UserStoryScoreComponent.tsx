import { Box, Card } from "@mui/joy";
import CardHeader from "@mui/material/CardHeader";
import { Clock } from "lucide-react";
import React from "react";

const UserStoryScoreComponent = () => {
  return (
    <Card
      variant="outlined"
      color="primary"
      style={{
        width: 200,
        height: 200,
        border: "1px solid  #9DBEFF",
        padding: 0,
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
        {/* <CardHeader title="Another Card" />
    <CardContent>Score is 50</CardContent> */}
        <Clock size={85} />
        <CardHeader title="Story Point : 2" />
      </Box>
    </Card>
  );
};

export default UserStoryScoreComponent;
