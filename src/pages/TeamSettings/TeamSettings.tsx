import React, { useEffect, useState } from "react";
import SideNav from "../../components/Navbar/SideNav";
import { Box, Card, Divider, Grid, useTheme } from "@mui/joy";
import OngoingMeetings from "../../components/TeamSettings/OngoingMeetings";
import RecentActivities from "../../components/TeamSettings/RecentActivities";
import TeamList from "../../components/TeamSettings/TeamList";
import Header from "../../components/Navbar/Header";
import { Drawer, useMediaQuery } from "@mui/material";
import fetchOngoingMeeting from "../../components/TeamSettings/api/fetchOngoingMeetings";

const TeamSettings = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTeamId, setSelectedTeamId] = React.useState<number | null>(
    null
  );

  interface OngoingMeetingProps {
    sessionTitle: string;
    createDateTime: string;
  }
  const [ongoingMeetings, setOngoingMeetings] = useState<OngoingMeetingProps[]>(
    []
  );

  useEffect(() => {
    fetchOngoingMeeting()
      .then((response: any) => {
        console.log("Response from addSessionParticipants:", response);
        setOngoingMeetings(response);
      })
      .catch((error) => {
        console.error(
          "Error occurred while adding session participants:",
          error
        );
      });
  }, []);

  return (
    <>
      <Header />
      <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
        <Grid md={"auto"}>
          <Box
            pl={2}
            sx={{
              display: { xs: "none", md: "flex" },
              height: "100%",
            }}
          >
            <SideNav></SideNav>
          </Box>

          {isSmallScreen ? (
            <Drawer variant="temporary">
              {/* Drawer content goes here */}
            </Drawer>
          ) : (
            <Box></Box>
            // <TeamListDrawer />
          )}
        </Grid>
        <Grid xs={16} md={12} px={3} pb={2} sx={{ flexGrow: 1 }} mx="auto">
          <Box>
            <Card sx={{ m: 3, display: "flex" }}>
              <TeamList />
            </Card>
            <OngoingMeetings ongoingMeetings={ongoingMeetings} />
            <RecentActivities />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TeamSettings;
