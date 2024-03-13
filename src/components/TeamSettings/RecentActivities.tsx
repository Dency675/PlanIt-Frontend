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
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import RecentActivity, { RecentActivityProps } from "./RecentActivity";
import axios from "axios";
import { parse } from "date-fns";
import { Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [visibleRecentActivityCount, setVisibleRecentActivityCount] =
    useState<number>(3);
  const [offset, setOffset] = useState<number>(0);

  const sortedRecentMeetings = [...recentMeetings].sort((a, b) => {
    if (sortBy === "createDateTime") {
      const dateA = parse(a.createDateTime, "h:mm a dd-MM-yyyy E", new Date());
      const dateB = parse(b.createDateTime, "h:mm a dd-MM-yyyy E", new Date());
      console.log(dateA);
      return sortOrder === "ASC"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
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

  const loadMoreRecentActivities = () => {
    console.log("Loading more recent activities...");
    setVisibleRecentActivityCount((prevCount) => prevCount + 3);
    setOffset((prev) => prev + 3);
  };

  return (
    <List>
      <ListItem nested>
        <ListSubheader sticky>Past Meetings</ListSubheader>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}
        >
          <Typography
            variant="subtitle1"
            sx={{ cursor: "pointer" }}
            onClick={() => handleSort("sessionTitle")}
          >
            Title
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ cursor: "pointer" }}
            onClick={() => handleSort("createDateTime")}
          >
            Date
          </Typography>
        </Box>
        {recentMeetings.length === 0 ? (
          <Typography sx={{ p: 2 }}>No Past Meetings</Typography>
        ) : (
          <InfiniteScroll
            dataLength={visibleRecentActivityCount}
            next={loadMoreRecentActivities}
            hasMore={visibleRecentActivityCount < recentMeetings.length}
            loader={<h4>Loading...</h4>}
            // endMessage={
            //   <p style={{ textAlign: "center" }}>
            //     <b>No more meetings to load</b>
            //   </p>
            // }
          >
            <List
              aria-labelledby="ellipsis-list-demo"
              sx={{ "--ListItemDecorator-size": "50px", padding: 2 }}
            >
              {sortedRecentMeetings
                .slice(0, visibleRecentActivityCount)
                .map((recentActivity, index) => (
                  <React.Fragment key={index}>
                    <RecentActivity recentActivity={recentActivity} />
                  </React.Fragment>
                ))}
            </List>
          </InfiniteScroll>
        )}
      </ListItem>
    </List>
  );
};

export default RecentActivities;
