import React, { useEffect, useState } from "react";
import SideNav from "../../components/Navbar/SideNav";
import { Box, Button, Card, Divider, Grid, useTheme } from "@mui/joy";
import OngoingMeetings from "../../components/TeamSettings/OngoingMeetings";
import RecentActivities from "../../components/TeamSettings/RecentActivities";
import TeamList from "../../components/TeamSettings/TeamList";
import Header from "../../components/Navbar/Header";
import { Drawer, useMediaQuery } from "@mui/material";
import fetchRecentMeetingsOfTeam from "../TeamSettings/apis/fetchRecentMeetingsOfTeam";
import fetchOngoingMeetingsByTeam from "../TeamSettings/apis/fetchOngoingMeetingsByTeam";
import { useNavigate, useParams } from "react-router";
import { formatDateTime } from "./apis/formatDateTime";
import { identifier } from "stylis";
import AddIcon from "@mui/icons-material/Add";

interface TeamLists {
  teamInfoList: {
    id: number;
    teamName: string;
  };
}

const TeamSettings = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTeamId, setSelectedTeamId] = useState<number>(1);
  // const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const navigate = useNavigate();

  const [selectedUserArray, setSelectedUserArray] = React.useState([]);

  const [teamLists, setTeamLists] = useState<TeamLists["teamInfoList"][]>([]); // New state for team list

  // Function to update the team list state
  const updateTeamList = (newTeamList: TeamLists["teamInfoList"][]) => {
    setTeamLists(newTeamList);
  };

  const { teamId } = useParams();
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
  // const userId = localStorage.getItem("userId");

  React.useEffect(() => {
    fetchOngoingMeetingsByTeam(selectedTeamId as number)
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
  }, [selectedTeamId]);

  // Fetch recent meetings of the user
  useEffect(() => {
    if (selectedTeamId) {
      const requestBody = {
        sortBy: "createDateTime",
        sortOrder: "DESC",
        fromDate: "2024-01-01",
        toDate: "2024-02-01",
        offset: 0,
        limit: 10,
      };

      fetchRecentMeetingsOfTeam(selectedTeamId, requestBody)
        .then((response: any) => {
          console.log("Recent meetings:", response);

          console.log("Recent meetings ipo:", response.status);

          if (response.status === 200) {
            const ongoingMeetingData = response.data.map((meeting: any) => ({
              ...meeting,
              createDateTime: formatDateTime(meeting.createDateTime),
            }));
            setRecentMeetings(ongoingMeetingData);
          } else if (response.status === 204) {
            setRecentMeetings([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching recent meetings:", error);
        });
    }
  }, [selectedTeamId]);

  useEffect(() => {
    console.log(ongoingMeetings);
  }, [ongoingMeetings]);

  console.log("ongoing not API", ongoingMeetings);

  const role = "scrum master";

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
            />
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
              <TeamList
                teamId={selectedTeamId}
                selectedUserArray={selectedUserArray}
              />
            </Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pb: 2,
                mr: 3,
              }}
            >
              {role.includes("scrum master") && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate(`/roomCreation/${teamId}`);
                  }}
                >
                  Create Room
                </Button>
              )}
            </Box>
            <OngoingMeetings ongoingMeetings={ongoingMeetings} />
            <RecentActivities recentMeetings={recentMeetings} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TeamSettings;
