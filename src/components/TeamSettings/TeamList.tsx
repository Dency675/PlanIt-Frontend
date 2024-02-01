import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Typography,
} from "@mui/joy";
import Input from "@mui/joy/Input";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TeamMember from "./TeamMember";

interface TeamMemberData {
  id: number;
  name: string;
  role: string;
}

const TeamList: React.FC = () => {
  const initialTeamMembers: TeamMemberData[] = [
    { id: 1, name: "Dencymol Baby", role: "Project Manager" },
    { id: 2, name: "Mariyam Baby", role: "Developer" },
    { id: 3, name: "Aljo Baby", role: "Scrum Master" },
    { id: 4, name: "Gee Baby", role: "Project Manager" },
    // Add more dummy data as needed
  ];

  // const TeamList = () => {
  //   const [teamMembers, setTeamMembers] = useState([
  //     { id: 1, name: "Dencymol Baby", role: "Project Manager" },
  //     { id: 2, name: "Mariyam Baby", role: "Developer" },
  //     { id: 3, name: "Aljo Baby", role: "Scrum Master" },
  //     { id: 4, name: "Gee Baby", role: "Project Manager" },
  //     // Add more dummy data as needed
  //   ]);

  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [scrumMasterId, setScrumMasterId] = useState<number | null>(null);

  const handleRemoveMember = (id: number) => {
    setTeamMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== id)
    );

    // If the removed member was the Scrum Master, reset Scrum Master status
    if (scrumMasterId === id) {
      setScrumMasterId(null);
    }
  };

  const handleMakeScrumMaster = (id: number) => {
    setScrumMasterId(id);
  };

  return (
    <Box>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: "0.15rem", m: 2, fontSize: 16 }}
      >
        Team Members
      </Typography>
      <Sheet
        sx={{
          maxHeight: { xs: 200, sm: 300 },
          overflow: "auto",
          borderRadius: "sm",
        }}
      >
        <List
          sx={{
            "--ListItemDecorator-size": "56px",
            width: "100%",
            p: { xs: 0, sm: 2 },
          }}
        >
          {teamMembers.map((member) => (
            <React.Fragment key={member.id}>
              <ListDivider />
              <TeamMember
                member={member}
                isScrumMaster={scrumMasterId === member.id}
                onRemove={() => handleRemoveMember(member.id)}
                onMakeScrumMaster={() => handleMakeScrumMaster(member.id)}
              />
            </React.Fragment>
          ))}
        </List>
      </Sheet>
      {/* ... (rest of your code) */}
    </Box>
  );
};

export default TeamList;
