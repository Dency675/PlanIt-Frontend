import React from "react";
import TeamList from "../../components/TeamSettings/TeamList";
import { Box, Card, Divider, Grid, useTheme } from "@mui/joy";
import OngoingMeetings from "../../components/TeamSettings/OngoingMeetings";
import RecentActivities from "../../components/TeamSettings/RecentActivities";
import SideNav from "../../components/Navbar/SideNav";
import Header from "../../components/Navbar/Header";
import { Drawer, useMediaQuery } from "@mui/material";
import SearchBar from "../../components/Search/SearchBar";
import Banar from "../../components/Search/Banar";

const TeamManagement = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const name: string = "Mariyam";

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

          {isSmallScreen ? <Drawer variant="temporary"></Drawer> : <Box></Box>}
        </Grid>
        <Grid xs={16} md={12} px={3} pb={2} sx={{ flexGrow: 1 }} mx="auto">
          <Box>
            <SearchBar />
            <Banar names={name} />
            <OngoingMeetings />
            <RecentActivities />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TeamManagement;
