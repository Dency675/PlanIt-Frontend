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
import RecentActivity from "./RecentActivity";

const RecentActivities = () => {
  return (
    <Box>
      <Card sx={{ width: 740, m: 3 }}>
        <List>
          <ListItem nested>
            <ListSubheader sticky>Past Meetings</ListSubheader>
            <Sheet
              variant="outlined"
              sx={{
                maxHeight: 300,
                overflow: "auto",
                borderRadius: "sm",
              }}
            >
              <List
                aria-labelledby="ellipsis-list-demo"
                sx={{ "--ListItemDecorator-size": "50px", padding: 2 }}
              >
                {[...Array(10)].map((__, index) => (
                  <RecentActivity />
                ))}
              </List>
            </Sheet>
          </ListItem>
        </List>
      </Card>
    </Box>
  );
};

export default RecentActivities;
