import React from "react";
import SideNav from "../../components/Navbar/SideNav";
import { Box, Card, Divider, Grid, useTheme } from "@mui/joy";
import OngoingMeetings from "../../components/TeamSettings/OngoingMeetings";
import RecentActivities from "../../components/TeamSettings/RecentActivities";
import TeamList from "../../components/TeamSettings/TeamList";
import Header from "../../components/Navbar/Header";
import { Drawer, useMediaQuery } from "@mui/material";

const TeamSettings = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTeamId, setSelectedTeamId] = React.useState<number | null>(
    null
  );

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
            <OngoingMeetings />
            <RecentActivities />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TeamSettings;
