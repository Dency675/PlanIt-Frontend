import { Settings } from "@mui/icons-material";
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
  Typography,
} from "@mui/joy";
import React from "react";
import Input from "@mui/joy/Input";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TeamMember from "../TeamSettings/TeamMember";

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
        sx={{ "--ListItemDecorator-size": "56px" }}
      >
        <ListDivider />
        <TeamMember />
      </List>
      <Divider sx={{ height: 2 }} />
      <Box sx={{ pt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Input placeholder="+ Add Member" endDecorator={<PersonSearchIcon />} />
      </Box>
    </Box>
  );
};

export default TeamList;
