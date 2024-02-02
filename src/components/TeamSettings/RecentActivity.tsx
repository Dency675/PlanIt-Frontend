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
      <ListItem
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Flex direction based on screen size
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mr: { xs: 0, sm: 2 }, // Margin right based on screen size
            mb: { xs: 1, sm: 0 }, // Margin bottom based on screen size
          }}
        >
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
        </Box>
        <Button sx={{ mt: { xs: 1, sm: 0 } }}>View Report</Button> {/* Margin top based on screen size */}
      </ListItem>
      <ListDivider />
    </Box>
  );
};

export default RecentActivity;
