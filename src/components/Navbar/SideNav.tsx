import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Home from "@mui/icons-material/Home";
import TeamName from "../TeamSettings/TeamName";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListDivider, Divider } from "@mui/joy";
import { AnyARecord } from "dns";

interface TeamLists {
  teamInfoList: {
    id: number;
    teamName: string;
  };
}

interface SideNavProps {
  onSelectTeam: (teamId: number) => void;
  resetSelectedUserArray: () => void;
  updateTeamList: (newTeamList: TeamLists["teamInfoList"][]) => void; // Add this prop
}

const SideNav: React.FC<SideNavProps> = ({
  onSelectTeam,
  resetSelectedUserArray,
  updateTeamList,
}) => {
  const navigate = useNavigate();
  const [teamLists, setTeamLists] = useState<TeamLists["teamInfoList"][]>([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTeamLists = async () => {
      try {
        console.log("here before");
        console.log(userId);
        const response = await axios.get(
          `http://localhost:3001/getTeamInformationByUserId?userId=${userId}`
        );
        if (response.status === 200) {
          const teamListData = response.data.teamInfoList;
          setTeamLists(teamListData);
          console.log("teamListData");
          console.log(teamListData);
          updateTeamList(teamListData);
        } else if (response.status === 204) {
          setTeamLists([]);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeamLists();
  }, []);

  const handleSelectTeam = (teamId: number) => {
    // Call the onSelectTeam callback function to handle team selection
    onSelectTeam(teamId);
    // Reset the selectedUserArray by calling the resetSelectedUserArray callback function
    resetSelectedUserArray();
    navigate(`/teamSettings/${teamId}`);
  };

  return (
    <Box
      pr={4}
      sx={{
        flexGrow: 1,
        // display: { xs: "none", md: "flex" },
        borderRight: "1px solid",
        borderColor: "divider",
        justifyContent: "center",
        gap: 2,
        flexWrap: "wrap",
        "& > *": { minWidth: 0, flexBasis: 200 },
      }}
    >
      <div>
        <Typography level="body-xs" mb={2}></Typography>
        <List
          sx={{
            borderRadius: "sm",
          }}
        >
          <ListItem sx={{ paddingBottom: 3 }}>
            <ListItemDecorator>
              <Home />
            </ListItemDecorator>
            Team List
          </ListItem>
          {teamLists.length === 0 ? (
            <Typography level="body-xs">No teams</Typography>
          ) : (
            teamLists.map((teamList, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      handleSelectTeam(teamList.id);
                      console.log(teamList.id);
                    }}
                  >
                    {teamList.teamName}
                  </ListItemButton>
                </ListItem>
                <ListDivider />
              </React.Fragment>
            ))
          )}
          {/* {teamLists.map((teamList, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    handleSelectTeam(teamList.id);
                    // onSelectTeam(teamList.id);
                    console.log(teamList.id);
                  }}
                >
                  {teamList.teamName}
                </ListItemButton>
              </ListItem>
              <ListDivider />
            </React.Fragment>
          ))} */}
        </List>
      </div>
    </Box>
  );
};

export default SideNav;
