import Card from "@mui/joy/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/joy";
import UserStoryParicipantComponent from "./UserStoryParicipantComponent";
import UserStoryScoreComponent from "./UserStoryScoreComponent";
import { CardHeader } from "@mui/material";

const UserStoryComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        variant="outlined"
        color="primary"
        style={{
          width: 1100,
          paddingLeft: 7,
          paddingRight: 7,
          backgroundColor: "#FFFFFF",
          marginBottom: 35,
          border: "0.5px solid #9DBEFF",
        }}
      >
        <CardHeader title="Story 1" />
        <Typography level="body-xs">
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups
        </Typography>
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UserStoryParicipantComponent />
            <UserStoryScoreComponent />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStoryComponent;
