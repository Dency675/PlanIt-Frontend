import React, { useEffect, useState } from "react";
import { Box, Card, Divider, Grid, useTheme } from "@mui/joy";
import OngoingMeetings from "../../components/TeamSettings/OngoingMeetings";
import RecentActivities from "../../components/TeamSettings/RecentActivities";
import SideNav from "../../components/Navbar/SideNav";
import Header from "../../components/Navbar/Header";
import { Drawer, useMediaQuery } from "@mui/material";
import SearchBar from "../../components/Search/SearchBar";
import Banar from "../../components/Search/Banar";
import getUserInformationById from "./api/fetchUserData";
import fetchOngoingMeeting from "../../components/TeamSettings/api/fetchOngoingMeetings";
import fetchOngoingMeetingById from "./api/fetchOngoingMeetingsByUser";
import fetchRecentMeetingsOfUser from "./api/fetchRecentMeetingsOfUser";
import axios from "axios";

const TeamManagement = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [name, setName] = useState<string>("");

  const userId = localStorage.getItem("userId");

  React.useEffect(() => {
    getUserInformationById(userId as string)
      .then((givenName: string) => {
        console.log("Given name:", givenName);
        setName(givenName);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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

  React.useEffect(() => {
    fetchOngoingMeetingById(userId as string)
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
  }, []);

  // Fetch recent meetings of the user
  useEffect(() => {
    if (userId) {
      const requestBody = {
        sortBy: "createDateTime",
        sortOrder: "DESC",
        fromDate: "2024-01-01",
        toDate: "2024-02-01",
        offset: 0,
        limit: 10,
      };

      fetchRecentMeetingsOfUser(userId, requestBody)
        .then((response: any) => {
          console.log("Recent meetings:", response);
          setRecentMeetings(response);
        })
        .catch((error) => {
          console.error("Error fetching recent meetings:", error);
        });
    }
  }, [userId]);

  const [selectedTeamId, setSelectedTeamId] = useState<number>(1);

  const handleTeamSelect = (teamId: number) => {
    setSelectedTeamId(teamId);
    console.log(teamId);
  };

  React.useEffect(() => {
    const fetchTeamLists = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getMembers`, {
          params: {
            teamId: selectedTeamId,
          },
        });
        const teamListData = response.data;

        console.log("teamListData");
        console.log(teamListData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeamLists();
  }, [selectedTeamId]);

  const [selectedUserId, setSelectedUserId] = React.useState<string>("");

  React.useEffect(() => {
    console.log("selectedUserArrayWithId");
    console.log(selectedUserId);
  }, [selectedUserId]);

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

          {isSmallScreen ? <Drawer variant="temporary"></Drawer> : <Box></Box>}
        </Grid>
        <Grid xs={16} md={12} px={3} pb={2} sx={{ flexGrow: 1 }} mx="auto">
          <Box>
            <SearchBar setSelectedUserId={setSelectedUserId} />
            <Banar names={name} />
            <OngoingMeetings ongoingMeetings={ongoingMeetings} />
            <RecentActivities recentMeetings={recentMeetings} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TeamManagement;
