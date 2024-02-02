import { Avatar, Box, Button, ButtonGroup, Divider, IconButton, List, ListDivider, ListItem, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import React from "react";
import Input from "@mui/joy/Input";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TeamMember from "./TeamMember";

const TeamList = () => {
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
      <List 
        aria-labelledby="ellipsis-list-demo"
        sx={{
          "--ListItemDecorator-size": "56px",
          width: "100%", // Make the list width 100% to fill the container
          p: { xs: 0, sm: 2 }, // Add padding for smaller screens
        }}
      >
        <ListDivider />
        <TeamMember />
      </List>
      <Divider sx={{ height: 2 }} />
      <Box sx={{  pt: 2, display: "flex",mt:2, justifyContent: "flex-end", p: { xs: 2, sm: 0 } }}>
        <Input placeholder="+ Add Member" endDecorator={<PersonSearchIcon />} />
      </Box>
    </Box>
  );
};

export default TeamList;
