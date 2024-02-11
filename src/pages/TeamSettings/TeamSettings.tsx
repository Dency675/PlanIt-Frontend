import React, { useEffect, useState } from "react";
import SideNav from "../../components/Navbar/SideNav";
import { Box, Card, Divider, Grid, useTheme } from "@mui/joy";
import OngoingMeetings from "../../components/TeamSettings/OngoingMeetings";
import RecentActivities from "../../components/TeamSettings/RecentActivities";
import TeamList from "../../components/TeamSettings/TeamList";
import Header from "../../components/Navbar/Header";
import { Drawer, useMediaQuery } from "@mui/material";
import fetchRecentMeetingsOfTeam from "../TeamSettings/apis/fetchRecentMeetingsOfTeam";
import fetchOngoingMeetingsByTeam from "../TeamSettings/apis/fetchOngoingMeetingsByTeam";

const TeamSettings = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTeamId, setSelectedTeamId] = useState<number>(0);
  // const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const handleTeamSelect = (teamId: number) => {
    setSelectedTeamId(teamId);
    console.log(`team id here:`, teamId);
  };

  interface OngoingMeetingProps {
    id: number;
    sessionTitle: string;
    createDateTime: string;
    scrumMasterId: string;
    status: string;
  }
  const [ongoingMeetings, setOngoingMeetings] = useState<OngoingMeetingProps[]>(
    []
  );
  const [recentMeetings, setRecentMeetings] = useState<OngoingMeetingProps[]>(
    []
  );
  // const userId = localStorage.getItem("userId");

  React.useEffect(() => {
    fetchOngoingMeetingsByTeam(selectedTeamId as number)
      .then((response: any) => {
        console.log("Response from .......:", response);
        setOngoingMeetings(response);
      })
      .catch((error) => {
        console.error(
          "Error occurred while adding session participants:",
          error
        );
      });
  }, [selectedTeamId]);

  // Fetch recent meetings of the user
  useEffect(() => {
    if (selectedTeamId) {
      // const requestBody = {
      //   sortBy: "createDateTime",
      //   sortOrder: "DESC",
      //   fromDate: "2024-01-01",
      //   toDate: "2024-02-01",
      //   offset: 0,
      //   limit: 10,
      // };

      fetchRecentMeetingsOfTeam(
        selectedTeamId
        // , requestBody
      )
        .then((response: any) => {
          console.log("Recent meetings:", response);
          setRecentMeetings(response);
        })
        .catch((error) => {
          console.error("Error fetching recent meetings:", error);
        });
    }
  }, [selectedTeamId]);

  useEffect(() => {
    console.log(ongoingMeetings);
  }, [ongoingMeetings]);

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
            <SideNav onSelectTeam={handleTeamSelect}></SideNav>
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
              <TeamList teamId={selectedTeamId} />
            </Card>
            {/* <OngoingMeetings ongoingMeetings={ongoingMeetings} /> */}
            <RecentActivities recentMeetings={recentMeetings} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default TeamSettings;
