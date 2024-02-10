import { Padding } from "@mui/icons-material";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardOverflow,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Sheet,
  Typography,
} from "@mui/joy";
import { CardContent } from "@mui/joy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import io from "socket.io-client";
import editSessions from "./api/editSessions";

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
  const socket = io("http://localhost:3001", {
    transports: ["websocket"],
  });
  const [roomCreated, setRoomCreated] = useState(false);

  // useEffect(() => {
  socket.on("roomCreated", (sessionId) => {
    editSessions(sessionId)
      .then((response: any) => {
        console.log("session status is ", response);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });
  });

  // return () => {
  //   // Cleanup socket on unmount
  //   socket.disconnect();
  // };
  // }, []);

  const handleStartButtonClick = (sessionId: number) => {
    console.log("createRoom");

    socket.emit("createRoom", sessionId);
  };

  return (
    <Grid container>
      <Grid xs={12}>
        <Typography
          id="ellipsis-list-demo"
          level="body-xs"
          textTransform="uppercase"
          sx={{ letterSpacing: "0.15rem", ml: 4, fontSize: 16 }}
        >
          Ongoing Meeting
        </Typography>
      </Grid>

      <Grid>
        <Box sx={{ display: "flex" }}>
          {ongoingMeetings.map((ongoingMeeting, index) => (
            <React.Fragment key={index}>
              <Card orientation="horizontal" variant="outlined" sx={{ m: 3 }}>
                <CardContent>
                  {/* <ListItemButton> */}
                  <Typography fontWeight="md" textColor="success.plainColor">
                    {ongoingMeeting.sessionTitle}
                  </Typography>
                  <Typography level="body-sm" sx={{ display: "flex" }}>
                    <AccessTimeIcon sx={{ paddingRight: 1 }} />{" "}
                    {ongoingMeeting.createDateTime}
                  </Typography>
                  {/* </ListItemButton> */}
                </CardContent>

                <CardOverflow
                  variant="soft"
                  color="primary"
                  sx={{
                    px: 0.2,
                    writingMode: "vertical-rl",
                    justifyContent: "center",
                    fontSize: "xs",
                    fontWeight: "xl",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    borderLeft: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {/* <ListItemButton
                    onClick={() => {
                      navigate(`/room/${ongoingMeeting.id}`);
                      handleStartButtonClick(ongoingMeeting.id);
                      // {userId===ongoingMeeting.scrumMasterId ? handleStartButtonClick(ongoingMeeting.id):()=>{}}
                    }}
                    disabled={userId !== ongoingMeeting.scrumMasterId}
                  >
                    {userId === ongoingMeeting.scrumMasterId ? "Start" : "Join"}
                  </ListItemButton> */}

                  {userId === ongoingMeeting.scrumMasterId ? (
                    <ListItemButton
                      onClick={() => {
                        navigate(`/vote/${ongoingMeeting.id}`);
                        handleStartButtonClick(ongoingMeeting.id);
                      }}
                    >
                      Start
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      onClick={() => {
                        navigate(`/vote/${ongoingMeeting.id}`);
                      }}
                      disabled={ongoingMeeting.status !== "active"}
                    >
                      Join {ongoingMeeting.status}
                      {/* ${ongoingMeeting.scrumMasterId} */}
                    </ListItemButton>
                  )}
                </CardOverflow>
              </Card>
            </React.Fragment>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default OngoingMeetings;
