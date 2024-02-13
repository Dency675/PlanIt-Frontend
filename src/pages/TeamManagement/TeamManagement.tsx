import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Input,
  ModalDialog,
  useTheme,
} from "@mui/joy";
import OngoingMeetings from "../../components/TeamSettings/OngoingMeetings";
import RecentActivities from "../../components/TeamSettings/RecentActivities";
import SideNav from "../../components/Navbar/SideNav";
import Header from "../../components/Navbar/Header";
import { Drawer, useMediaQuery } from "@mui/material";
import SearchBar from "../../components/Search/SearchBar";
import Banar from "../../components/Search/Banar";
import getUserInformationById from "./api/fetchUserData";
import fetchOngoingMeetingById from "./api/fetchOngoingMeetingsByUser";
import fetchRecentMeetingsOfUser from "./api/fetchRecentMeetingsOfUser";
import Modal from "@mui/joy/Modal";
import axios from "axios";

const TeamManagement = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [name, setName] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");

  const userId = localStorage.getItem("userId");

  React.useEffect(() => {
    getUserInformationById(userId as string)
      .then(({ givenName, email }) => {
        console.log("Given name:", givenName);
        console.log("Email:", email);
        // Assuming 'setName' is a function to update the state of 'name'
        setName(givenName);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [selectedUserArray, setSelectedUserArray] = React.useState([]);

  const handleSelectTeam = (teamId: number) => {
    setSelectedTeamId(teamId);
  };

  const handleResetSelectedUserArray = () => {
    setSelectedUserArray([]);
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

  const [open, setOpen] = React.useState<boolean>(false);

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

  const handleCreateTeam = async () => {
    try {
      // Make a POST request to your addTeamInformation API
      const response = await axios.post(
        "http://localhost:3001/addTeamInformation",
        {
          teamName: teamName,
          status: "active", // You can set the status based on your requirements
        }
      );

      const teamId = response.data.teamInfo.id;

      const teamMemberResponse = await axios.post(
        "http://localhost:3001/addMember",
        {
          userId: userId, // Replace userId with the actual user ID you want to add
          teamId: teamId,
        }
      );

      // Handle the response as needed
      console.log("Team created successfully:", response.data);
      console.log("Team member added successfully:", teamMemberResponse.data);

      // event.preventDefault();
      // Close the modal after creating the team
      setOpen(false);
    } catch (error) {
      console.error("Error creating team:", error);
      // Handle the error as needed
    }
  };

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
            <SideNav
              onSelectTeam={handleSelectTeam}
              resetSelectedUserArray={handleResetSelectedUserArray}
            />
          </Box>

          {isSmallScreen ? <Drawer variant="temporary"></Drawer> : <Box></Box>}
        </Grid>
        <Grid xs={16} md={12} px={3} pb={2} sx={{ flexGrow: 1 }} mx="auto">
          <Box>
            <SearchBar setSelectedUserId={setSelectedUserId} />
            <Banar names={name} />

            <Button variant="outlined" onClick={() => setOpen(true)}>
              Create New Team
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>Confirmation</DialogTitle>
                <Divider />
                <DialogContent>
                  <Input
                    placeholder="Enter Team Name"
                    onChange={(e) => setTeamName(e.target.value)}
                    value={teamName}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    variant="solid"
                    onClick={handleCreateTeam}
                  >
                    Create
                  </Button>
                  <Button
                    variant="plain"
                    color="neutral"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </ModalDialog>
            </Modal>
            <OngoingMeetings ongoingMeetings={ongoingMeetings} />
            <RecentActivities recentMeetings={recentMeetings} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TeamManagement;
