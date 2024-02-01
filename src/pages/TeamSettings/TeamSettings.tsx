import React from "react";
import TeamList from "../../components/Navbar/TeamList";
import { Box, Card, Divider, Grid } from "@mui/joy";
import OngoingMeetings from "../../components/TeamSettings/OngoingMeetings";
import RecentActivities from "../../components/TeamSettings/RecentActivities";
import SideNav from "../../components/TeamSettings/SideNav";
import Header from "../../components/Navbar/Header";

const TeamSettings = () => {
  return (
    <>
      <Header />
      <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
        <Grid
          xs={3}
          sx={{
            borderRight: "1px solid",
            borderColor: "divider",
          }}
        >
          <SideNav></SideNav>
        </Grid>
        <Grid xs={12}>
          <Box>
            <Card sx={{ m: 3, display: "flex" }}>
              <TeamList />
            </Card>
            <OngoingMeetings />
            <RecentActivities />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TeamSettings;
