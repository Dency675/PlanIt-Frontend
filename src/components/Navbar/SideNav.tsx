import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Home from "@mui/icons-material/Home";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListDivider } from "@mui/joy";
import { useSearchParams } from "react-router-dom";

interface TeamLists {
  teamInfoList: {
    id: number;
    teamName: string;
  };
}

interface SideNavProps {
  onSelectTeam: (teamId: number) => void;
  resetSelectedUserArray: () => void;
  updateTeamList: (newTeamList: TeamLists["teamInfoList"][]) => void;
}

const SideNav = ({
  onSelectTeam,
  resetSelectedUserArray,
  updateTeamList,
}: SideNavProps) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [teamLists, setTeamLists] = useState<TeamLists["teamInfoList"][]>([]);

  const handleSelectTeam = (teamId: number, teamName: string) => {
    onSelectTeam(teamId);
    resetSelectedUserArray();
    navigate(`/teamSettings/${teamId}/${teamName}`); // Include parameters in URL
  };

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

  return (
    <Box
      pr={4}
      sx={{
        flexGrow: 1,
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
                    onClick={() =>
                      handleSelectTeam(teamList.id, teamList.teamName)
                    }
                  >
                    {teamList.teamName}
                  </ListItemButton>
                </ListItem>
                <ListDivider />
              </React.Fragment>
            ))
          )}
        </List>
      </div>
    </Box>
  );
};

export default SideNav;
