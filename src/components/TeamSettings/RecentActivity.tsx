import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListSubheader,
  Sheet,
  Typography,
} from "@mui/joy";
import React from "react";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";

const RecentActivity = () => {
  return (
    <Box>
      <ListItem sx={{ display: "flex", alignItems: "left" }}>
        <ListItemDecorator>
          <MeetingRoomOutlinedIcon />
        </ListItemDecorator>
        <ListItemContent>
          <Typography level="title-sm" textColor={"black"}>
            Dencymol Baby
          </Typography>
          <Typography level="body-xs" noWrap>
            Project Manager
          </Typography>
        </ListItemContent>
        <Button>View Report</Button>
      </ListItem>
      <ListDivider />
    </Box>
  );
};

export default RecentActivity;
