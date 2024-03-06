import {
  Box,
  Card,
  CardContent,
  CardOverflow,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Typography,
  Button,
} from "@mui/joy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import editSessions from "./api/editSessions";
import { useSocket } from "../Socket/SocketContext";
import editSessionParticipants from "./api/editSessionParticipants";

interface OngoingMeetingProps {
  ongoingMeetings: {
    id: number;
    sessionTitle: string;
    createDateTime: string;
    scrumMasterId: string;
    status: string;
  }[];
}

const userId = localStorage.getItem("userId");

const OngoingMeetings = ({ ongoingMeetings }: OngoingMeetingProps) => {
  const navigate = useNavigate();

  const [showAllMeetings, setShowAllMeetings] = useState(false);

  const visibleMeetings = showAllMeetings
    ? ongoingMeetings
    : ongoingMeetings.slice(0, 3);

  const handleShowMoreClick = () => {
    setShowAllMeetings(true);
  };

  const socket = useSocket();

  const [userIds, setUserIds] = useState("");

  React.useEffect(() => {
    setUserIds(userId as string);
  }, [userId, userIds]);

  socket.on("roomCreated", (sessionId: string) => {
    editSessions(parseInt(sessionId), "active")
      .then((response: any) => {
        console.log("session status is ", response);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });

    console.log("userId", userId);

    editSessionParticipants(sessionId, userIds)
      .then((response: any) => {
        console.log("session status is ", response);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });
  });

  const handleStartButtonClick = (sessionId: number) => {
    console.log("createRoom");

    socket.emit("createRoom", sessionId);
  };

  const handleJoinButtonClick = (sessionId: number) => {
    console.log("joinRoom");

    socket.emit("joinRoom", sessionId, userId);
  };

  React.useEffect(() => {
    socket.on("userJoined", (data: { sessionId: string; userId: string }) => {
      console.log("userJoined", data.sessionId, userId);
      editSessionParticipants(data.sessionId, userId as string)
        .then((response: any) => {
          console.log("session status is ", response);
        })
        .catch((error) => {
          console.error("Error occurred while changing status :", error);
        });
    });
  }, []);

  return (
    <Grid container>
      <Grid xs={12}>
        <Typography
          id="ellipsis-list-demo"
          level="body-xs"
          textTransform="uppercase"
          sx={{ letterSpacing: "0.15rem", ml: 4, fontSize: 16, pb: 2 }}
        >
          Ongoing Meeting
        </Typography>
      </Grid>
      <Grid container spacing={3} sx={{ ml: 3 }}>
        {visibleMeetings.length === 0 ? (
          <Typography sx={{ m: 4 }}>No Ongoing Meetings</Typography>
        ) : (
          visibleMeetings.map((ongoingMeeting, index) => (
            <Grid key={index} xs={4}>
              <Card
                orientation="horizontal"
                variant="outlined"
                sx={{ height: "100%" }}
              >
                <CardContent>
                  <Typography
                    fontWeight="md"
                    textColor="success.plainColor"
                    sx={{ width: "180px" }}
                  >
                    {ongoingMeeting.sessionTitle}
                  </Typography>
                  <Typography level="body-sm" sx={{ display: "flex" }}>
                    {ongoingMeeting.createDateTime}
                  </Typography>
                </CardContent>
                <CardOverflow
                  variant="soft"
                  color="primary"
                  sx={{
                    px: 0.2,
                    justifyContent: "center",
                    fontSize: "xs",
                    fontWeight: "xl",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    borderLeft: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      navigate(`/vote/${ongoingMeeting.id}`);
                    }}
                  >
                    {ongoingMeeting.scrumMasterId === userId ? (
                      <React.Fragment>
                        <ListItemButton
                          sx={{ paddingRight: "5px", paddingLeft: "5px" }}
                          onClick={() => {
                            navigate(`/vote/${ongoingMeeting.id}`);
                          }}
                        >
                          Start
                        </ListItemButton>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <ListItemButton
                          sx={{ paddingRight: "5px", paddingLeft: "5px" }}
                          onClick={() => {
                            navigate(`/vote/${ongoingMeeting.id}`);
                          }}
                        >
                          Join
                        </ListItemButton>
                      </React.Fragment>
                    )}
                  </ListItemButton>
                </CardOverflow>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      {!showAllMeetings && (
        <Grid
          xs={12}
          sx={{ display: "flex", justifyContent: "end", mt: 2, mr: 6 }}
        >
          {visibleMeetings.length !== 0 && (
            <Button onClick={handleShowMoreClick}>Show More</Button>
          )}
        </Grid>
      )}
    </Grid>
  );
};
export default OngoingMeetings;
