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

interface RecentMeetingProps {
  recentMeetings: {
    id: number;
    sessionTitle: string;
    createDateTime: string;
  }[];
}

const RecentActivities = ({ recentMeetings }: RecentMeetingProps) => {
  const [recentActivities, setRecentActivities] = useState<
    RecentActivityProps["recentActivity"][]
  >([]);

  useEffect(() => {
    console.log("recentActivities below");
    console.log(recentActivities);
  }, [recentActivities]);

  const [sortBy, setSortBy] = useState<string>("createDateTime");
  const [sortOrder, setSortOrder] = useState<string>("DESC");

  const sortedMeetings = [...recentMeetings].sort((a, b) => {
    if (sortBy === "createDateTime") {
      const dateA = new Date(a.createDateTime).getTime();
      const dateB = new Date(b.createDateTime).getTime();
      console.log("dateA");
      console.log(dateA);
      return sortOrder === "ASC" ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === "ASC"
        ? a.sessionTitle.localeCompare(b.sessionTitle)
        : b.sessionTitle.localeCompare(a.sessionTitle);
    }
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
  };

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

            <ButtonGroup aria-label="sort">
              {/* <Button
                onClick={() => handleSort("createDateTime")}
                // color={sortBy === "createDateTime" ? "primary" : "default"}
              >
                Sort by Date
              </Button> */}
              <Button
                onClick={() => handleSort("sessionTitle")}
                // color={sortBy === "sessionTitle" ? "primary" : "default"}
              >
                Sort by Title
              </Button>
            </ButtonGroup>
            {recentMeetings.length === 0 ? (
              <Typography sx={{ p: 2 }}>No Past Meetings</Typography>
            ) : (
              <List
                aria-labelledby="ellipsis-list-demo"
                sx={{ "--ListItemDecorator-size": "50px", padding: 2 }}
              >
                {sortedMeetings.map((recentActivity, index) => (
                  <React.Fragment key={index}>
                    <RecentActivity recentActivity={recentActivity} />
                  </React.Fragment>
                ))}
              </List>
            )}
            {/* </Sheet> */}
          </ListItem>
        </List>
      </Card>
    </Box>
  );
};

export default RecentActivities;
