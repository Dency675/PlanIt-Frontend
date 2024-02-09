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
import React, { useEffect, useState } from "react";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import RecentActivity, { RecentActivityProps } from "./RecentActivity";
import axios from "axios";

const RecentActivities = () => {
  const [recentActivities, setRecentActivities] = useState<
    RecentActivityProps["recentActivity"][]
  >([]);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getAllRecentMeetings?teamId=1`
        );
        const pastMeetingData = response.data;
        setRecentActivities(pastMeetingData);
      } catch (error) {
        console.error("Error fetching past meetings:", error);
      }
    };
    fetchRecentActivities();
  }, []);
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
              {recentActivities.map((recentActivity, index) => (
                <React.Fragment key={index}>
                  <RecentActivity recentActivity={recentActivity} />
                </React.Fragment>
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
