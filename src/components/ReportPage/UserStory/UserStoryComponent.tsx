import Card from "@mui/joy/Card";
import { Box, Typography } from "@mui/joy";
import UserStoryParicipantComponent from "./UserStoryParicipantComponent";
import UserStoryScoreComponent from "./UserStoryScoreComponent";
import { CardHeader, Grid } from "@mui/material";

const UserStoryComponent = () => {
  return (
    <Grid
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
          maxWidth: 1100,
          width: "100%",
          margin: "0 auto",
          paddingLeft: 7,
          paddingRight: 7,
          backgroundColor: "#FFFFFF",
          marginBottom: 35,
          border: "0.5px solid #9DBEFF",
        }}
      >
        <CardHeader title="Story 1" />
        <Grid container spacing={1}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 35,
              paddingBottom: 20,
            }}
          >
            <UserStoryParicipantComponent />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UserStoryScoreComponent />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default UserStoryComponent;
