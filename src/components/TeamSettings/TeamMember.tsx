import {
  Avatar,
  Button,
  ButtonGroup,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";

interface TeamMemberProps {
  member: {
    id: number;
    name: string;
    role: string;
    // Add more properties if needed
  };
  isScrumMaster: boolean;
  onRemove: () => void;
  onMakeScrumMaster: () => void;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  member,
  isScrumMaster,
  onRemove,
  onMakeScrumMaster,
}) => {
  return (
    <ListItem
      sx={{
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      <ListItemDecorator>
        <Avatar src={`/static/images/avatar/${member.id}.jpg`} />
      </ListItemDecorator>
      <ListItemContent sx={{ ml: { xs: 0, md: 2 } }}>
        <Typography level="title-sm" textColor={"black"}>
          {member.name}
        </Typography>
        <Typography level="body-xs" noWrap>
          {member.role}
        </Typography>
      </ListItemContent>
      <ButtonGroup
        sx={{ mt: { xs: 2, md: 0 } }}
        spacing="0.5rem"
        aria-label="spacing button group"
      >
        <Button disabled={isScrumMaster} onClick={onMakeScrumMaster}>
          Make Scrum Master
        </Button>
        <Button onClick={onRemove}>Remove</Button>
      </ButtonGroup>
    </ListItem>
  );
};

export default TeamMember;
