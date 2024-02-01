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
      {" "}
      {/* Add margin for spacing */}
      <Card sx={{ m: 3 }}>
        {" "}
        {/* Adjust width based on screen size */}
        <List>
          <ListItem nested>
            <ListSubheader sticky>Past Meetings</ListSubheader>

            <List
              aria-labelledby="ellipsis-list-demo"
              sx={{ "--ListItemDecorator-size": "50px", padding: 2 }}
            >
              {[...Array(10)].map((__, index) => (
                <RecentActivity key={index} />
              ))}
            </List>
            {/* </Sheet> */}
          </ListItem>
        </List>
      </Card>
    </Box>
  );
};

export default RecentActivities;
