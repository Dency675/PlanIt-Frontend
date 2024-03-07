import Card from "@mui/joy/Card";
import { Box, Typography } from "@mui/joy";
import UserStoryParicipantComponent from "./UserStoryParicipantComponent";
import UserStoryScoreComponent from "./UserStoryScoreComponent";
import { CardHeader, Grid } from "@mui/material";
import {
  UserStory,
  UserStoryTitleAndPointResponse,
} from "../../../pages/ReportPage/types";

interface UserStoryProps {
  index: number;
  userStoryData: UserStoryTitleAndPointResponse;
  participantScoreData: UserStory[];
  viewMode: string;
}

const UserStoryComponent = ({
  index,
  userStoryData,
  participantScoreData,
  viewMode,
}: UserStoryProps) => {
  console.log("2 ", participantScoreData);
  console.log("2-index", index);

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
          paddingTop: 0,
          backgroundColor: "#FFFFFF",
          marginBottom: 35,
          border: "0.5px solid #9DBEFF",
        }}
      >
        <CardHeader
          style={{
            marginTop: 30,
            marginLeft: 20,
            marginBottom: 0,
            paddingBottom: 0,
          }}
          title={`Story ${userStoryData[index].userStoryId}`}
        />
        <Grid container style={{}} spacing={1}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography>{userStoryData[index].userStory.userStory}</Typography>
          </Grid>
          {viewMode === "short" && (
            <>
              <Grid
                item
                xs={12}
                sm={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="outlined"
                  color="primary"
                >{`Story Point : ${userStoryData[index].storyPointResult}`}</Typography>
              </Grid>
            </>
          )}
          {viewMode === "detailed" && (
            <>
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
                <UserStoryParicipantComponent
                  participantScores={
                    participantScoreData[index].participantScores
                  }
                />
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
                <UserStoryScoreComponent
                  userStoryData={userStoryData}
                  index={index}
                />
              </Grid>
              {userStoryData[index].comment && (
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}
                >
                  <Typography paddingLeft={3}>
                    <span style={{ color: "#0c5bed", fontWeight: "bold" }}>
                      Comments:
                    </span>{" "}
                    {userStoryData[index].comment}
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Card>
    </Grid>
  );
};

export default UserStoryComponent;
