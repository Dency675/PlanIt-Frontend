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
import { Link, useNavigate } from "react-router-dom";

export interface RecentActivityProps {
  recentActivity: {
    id: number;
    sessionTitle: string;
    createDateTime: string;
  };
}

const RecentActivity = ({ recentActivity }: RecentActivityProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <ListDivider />
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
            mr: { xs: 0, sm: 2 },
            mb: { xs: 1, sm: 0 },
          }}
        >
          <ListItemDecorator>
            <MeetingRoomOutlinedIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm" textColor={"black"}>
              {recentActivity.sessionTitle}
            </Typography>
            <Typography level="body-xs" noWrap>
              {recentActivity.createDateTime}
            </Typography>
          </ListItemContent>
        </Box>
        <Button
          // component={Link}
          // to={`/report/${recentActivity.id}`}
          sx={{ mt: { xs: 1, sm: 0 } }}
          onClick={() => navigate(`/report/${recentActivity.id}`)}
        >
          {/* <Link to={`/report/${recentActivity.id}`} /> */}
          View Report
        </Button>{" "}
      </ListItem>
    </Box>
  );
};

export default RecentActivity;
