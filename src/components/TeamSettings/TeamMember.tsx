// TeamMember.jsx

import {
  Avatar,
  Button,
  ButtonGroup,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";

import React from "react";

export interface TeamMemberProps {
  teamMember: {
    id: number;

    userInformation: {
      givenName: string;
    };

    role: {
      roleName: string;
    };
  };

  onRemove: (id: number) => void;
}

const TeamMember = ({ teamMember, onRemove }: TeamMemberProps) => {
  const { givenName } = teamMember.userInformation;

  const { roleName } = teamMember.role;

  // console.log("check2");

  // console.log(teamMember.id);

  return (
    <ListItem
      sx={{
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      <ListItemDecorator>
        <Avatar src="/static/images/avatar/1.jpg" />
      </ListItemDecorator>

      <ListItemContent sx={{ ml: { xs: 0, md: 2 } }}>
        <Typography level="title-sm" textColor={"black"}>
          {givenName}
        </Typography>

        <Typography level="body-xs" noWrap>
          {roleName}
        </Typography>
      </ListItemContent>

      <ButtonGroup
        sx={{ mt: { xs: 2, md: 0 } }}
        spacing="0.5rem"
        aria-label="spacing button group"
      >
        <Button disabled>Make Scrum Master</Button>

        <Button onClick={() => onRemove(teamMember.id)}>Remove</Button>
      </ButtonGroup>
    </ListItem>
  );
};

export { TeamMember };
