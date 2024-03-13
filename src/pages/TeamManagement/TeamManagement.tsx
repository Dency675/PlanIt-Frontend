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
import { Drawer, useMediaQuery, Button as Button2 } from "@mui/material";
import SearchBar from "../../components/Search/SearchBar";
import Banar from "../../components/Search/Banar";
import getUserInformationById from "./api/fetchUserData";
import fetchOngoingMeetingById from "./api/fetchOngoingMeetingsByUser";
import fetchRecentMeetingsOfUser from "./api/fetchRecentMeetingsOfUser";
import Modal from "@mui/joy/Modal";
import axios from "axios";
import { formatDateTime } from "./api/formatDateTime";
import AddIcon from "@mui/icons-material/Add";

interface TeamLists {
  teamInfoList: {
    id: number;
    teamName: string;
  };
}

const TeamManagement = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [name, setName] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const userId = localStorage.getItem("userId");
  const userRole = sessionStorage.getItem("userRoles");

  console.log("userRole", userRole);

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

  const [teamLists, setTeamLists] = useState<TeamLists["teamInfoList"][]>([]); // New state for team list

  const updateTeamList = (
    newTeamList: React.SetStateAction<{ id: number; teamName: string }[]>
  ) => {
    console.log("Team lists updated:", newTeamList); // Confirm that new team list is received
    setTeamLists(newTeamList);
  };

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
        if (response.status === 200) {
          const ongoingMeetingData = response.data.map((meeting: any) => ({
            ...meeting,
            createDateTime: formatDateTime(meeting.createDateTime),
          }));
          setOngoingMeetings(ongoingMeetingData);
        } else if (response.status === 204) {
          setOngoingMeetings([]);
        }
      })
      .catch((error) => {
        console.error(
          "Error occurred while adding session participants:",
          error
        );
      });
  }, []);

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

  useEffect(() => {
    console.log("Team lists updated:", teamLists);
  }, [teamLists]);
  const handleCreateTeam = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/addTeamInformation",
        {
          teamName: teamName,
          status: "active",
        }
      );
      const teamId = response.data.teamInfo.id;
      const teamMemberResponse = await axios.post(
        "http://localhost:3001/addMember",
        {
          userId: userId,
          teamId: teamId,
        }
      );
      console.log("Team created successfully:", response.data);
      console.log("Team member added successfully:", teamMemberResponse.data);
      if (teamMemberResponse.status === 201) {
        const updatedTeamListResponse = await axios.get(
          `http://localhost:3001/getTeamInformationByUserId?userId=${userId}`
        );
        const updatedTeamList = updatedTeamListResponse.data.teamInfoList;
        setTeamLists(updatedTeamList);
        console.log("UPDATED LISTTTTTTTT", updatedTeamList);
        console.log("teamlisssssssts", teamLists);
      }
      console.log("teamlisssssssts after scop", teamLists);
      setOpen(false);
    } catch (error) {
      console.error("Error creating team:", error);
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
              updateTeamList={updateTeamList}
              teamLists={teamLists}
              setTeamLists={setTeamLists}
            />
          </Box>

          {isSmallScreen ? <Drawer variant="temporary"></Drawer> : <Box></Box>}
        </Grid>
        <Grid xs={16} md={12} px={3} pb={2} sx={{ flexGrow: 1 }} mx="auto">
          <Box>
            <SearchBar setSelectedUserId={setSelectedUserId} />
            <Banar names={name} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pb: 2,
                mr: 2,
              }}
            >
              {userRole?.includes("project manager") && (
                <Button2
                  variant="outlined"
                  color="inherit"
                  onClick={() => setOpen(true)}
                >
                  <AddIcon sx={{ pr: 1 }}></AddIcon> Create New Team
                </Button2>
              )}
            </Box>
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
