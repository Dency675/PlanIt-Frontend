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
} from "@mui/joy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import editSessions from "./api/editSessions";
import { useSocket } from "../Socket/SocketContext";
import editSessionParticipants from "./api/editSessionParticipants";
import RecentActivity from "./RecentActivity";

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

  const socket = useSocket();

  socket.on("roomCreated", (sessionId: string) => {
    editSessions(parseInt(sessionId), "active")
      .then((response: any) => {
        console.log("session status is ", response);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });

    editSessionParticipants(sessionId, userId as string)
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
    socket.on("userJoined", (data: { sessionId: string }) => {
      console.log("userJoined", data.sessionId);
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
          sx={{ letterSpacing: "0.15rem", ml: 4, fontSize: 16 }}
        >
          Ongoing Meeting
        </Typography>
      </Grid>

      {ongoingMeetings.length === 0 ? (
        <Typography sx={{ m: 4 }}>No Ongoing Meetings</Typography>
      ) : (
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
                      {/* <AccessTimeIcon sx={{ paddingRight: 1 }} />{" "} */}
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
                    {userId === ongoingMeeting.scrumMasterId ? (
                      <ListItemButton
                        onClick={() => {
                          navigate(`/vote/${ongoingMeeting.id}`);
                          handleStartButtonClick(ongoingMeeting.id);
                        }}
                      >
                        Start {ongoingMeeting.scrumMasterId}
                      </ListItemButton>
                    ) : (
                      <ListItemButton
                        onClick={() => {
                          navigate(`/vote/${ongoingMeeting.id}`);
                          handleJoinButtonClick(ongoingMeeting.id);
                        }}
                        disabled={ongoingMeeting.status !== "active"}
                      >
                        Join
                      </ListItemButton>
                    )}
                  </CardOverflow>
                </Card>
              </React.Fragment>
            ))}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
// const OngoingMeetings = ({ ongoingMeetings }: OngoingMeetingProps) => {
//   console.log("ongoingMeetings", ongoingMeetings);
//   return (
//     <Grid container>
//       <Grid xs={12}>
//         <Typography
//           id="ellipsis-list-demo"
//           level="body-xs"
//           textTransform="uppercase"
//           sx={{ letterSpacing: "0.15rem", ml: 4, fontSize: 16 }}
//         >
//           Ongoing Meeting
//         </Typography>
//       </Grid>

//       <Grid>
//         <Box sx={{ display: "flex" }}>
//           {ongoingMeetings.map((ongoingMeeting, index) => (
//             <React.Fragment key={index}>
//               <Card orientation="horizontal" variant="outlined" sx={{ m: 3 }}>
//                 <CardContent>
//                   {/* <ListItemButton> */}
//                   <Typography fontWeight="md" textColor="success.plainColor">
//                     {ongoingMeeting.sessionTitle}
//                   </Typography>
//                   <Typography level="body-sm" sx={{ display: "flex" }}>
//                     {/* <AccessTimeIcon sx={{ paddingRight: 1 }} />{" "} */}
//                     {ongoingMeeting.createDateTime}
//                   </Typography>
//                   {/* </ListItemButton> */}
//                 </CardContent>

//                 <CardOverflow
//                   variant="soft"
//                   color="primary"
//                   sx={{
//                     px: 0.2,
//                     writingMode: "vertical-rl",
//                     justifyContent: "center",
//                     fontSize: "xs",
//                     fontWeight: "xl",
//                     letterSpacing: "1px",
//                     textTransform: "uppercase",
//                     borderLeft: "1px solid",
//                     borderColor: "divider",
//                   }}
//                 >
//                   {userId === ongoingMeeting.scrumMasterId ? (
//                     <ListItemButton
//                       onClick={() => {
//                         // navigate(`/vote/${ongoingMeeting.id}`);
//                         // handleStartButtonClick(ongoingMeeting.id);
//                       }}
//                     >
//                       Start {ongoingMeeting.scrumMasterId}
//                     </ListItemButton>
//                   ) : (
//                     <ListItemButton
//                       onClick={() => {
//                         // navigate(`/vote/${ongoingMeeting.id}`);
//                         // handleJoinButtonClick(ongoingMeeting.id);
//                       }}
//                       disabled={ongoingMeeting.status !== "active"}
//                     >
//                       Join
//                       {/* {ongoingMeeting.status} */}
//                     </ListItemButton>
//                   )}
//                 </CardOverflow>
//               </Card>
//             </React.Fragment>
//           ))}
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };
// const OngoingMeetings = ({ ongoingMeetings }: OngoingMeetingProps) => {
//   console.log("ongoingMeetings", ongoingMeetings);
//   return (
//     <Grid container>
//       <Grid xs={12}>
//         <Typography
//           id="ellipsis-list-demo"
//           level="body-xs"
//           textTransform="uppercase"
//           sx={{ letterSpacing: "0.15rem", ml: 4, fontSize: 16 }}
//         >
//           Ongoing Meetings
//         </Typography>
//       </Grid>

//       {ongoingMeetings.length === 0 ? (
//         <Typography sx={{ m: 4 }}>No Ongoing Meetings</Typography>
//       ) : (
//         <Grid>
//           <Box sx={{ display: "flex", width: "600" }}>
//             {ongoingMeetings.map((ongoingMeeting, index) => (
//               <React.Fragment key={index}>
//                 <Card orientation="horizontal" variant="outlined" sx={{ m: 3 }}>
//                   <CardContent>
//                     <Typography fontWeight="md" textColor="success.plainColor">
//                       {ongoingMeeting.sessionTitle}
//                     </Typography>
//                     <Typography level="body-sm" sx={{ display: "flex" }}>
//                       {ongoingMeeting.createDateTime}
//                     </Typography>
//                   </CardContent>

//                   <CardOverflow
//                     variant="soft"
//                     color="primary"
//                     sx={{
//                       px: 0.2,
//                       writingMode: "vertical-rl",
//                       justifyContent: "center",
//                       fontSize: "xs",
//                       fontWeight: "xl",
//                       letterSpacing: "1px",
//                       textTransform: "uppercase",
//                       borderLeft: "1px solid",
//                       borderColor: "divider",
//                     }}
//                   >
//                     {userId === ongoingMeeting.scrumMasterId ? (
//                       <ListItemButton
//                         onClick={() => {
//                           // handleStartButtonClick(ongoingMeeting.id);
//                         }}
//                       >
//                         Start {ongoingMeeting.scrumMasterId}
//                       </ListItemButton>
//                     ) : (
//                       <ListItemButton
//                         onClick={() => {
//                           // handleJoinButtonClick(ongoingMeeting.id);
//                         }}
//                         disabled={ongoingMeeting.status !== "active"}
//                       >
//                         Join
//                       </ListItemButton>
//                     )}
//                   </CardOverflow>
//                 </Card>
//               </React.Fragment>
//             ))}
//           </Box>
//         </Grid>
//       )}
//     </Grid>
//   );
// };

// const OngoingMeetings = ({ ongoingMeetings }: OngoingMeetingProps) => {
//   console.log("ongoingMeetings", ongoingMeetings);
//   return (
//     <Grid container>
//       <Grid xs={12}>
//         <Typography
//           id="ellipsis-list-demo"
//           level="body-xs"
//           textTransform="uppercase"
//           sx={{ letterSpacing: "0.15rem", ml: 4, fontSize: 16 }}
//         >
//           Ongoing Meeting
//         </Typography>
//       </Grid>

//       {ongoingMeetings.length === 1 ? (
//         <Grid xs={12} sx={{ m: 4 }}>
//           <Typography>No Ongoing Meetings</Typography>
//         </Grid>
//       ) : (
//         <Grid>
//           <Box sx={{ display: "flex" }}>
//             {ongoingMeetings.map((ongoingMeeting, index) => (
//               <React.Fragment key={index}>
//                 <Card orientation="horizontal" variant="outlined" sx={{ m: 3 }}>
//                   <CardContent>
//                     {/* <ListItemButton> */}
//                     <Typography fontWeight="md" textColor="success.plainColor">
//                       {ongoingMeeting.sessionTitle}
//                     </Typography>
//                     <Typography level="body-sm" sx={{ display: "flex" }}>
//                       {/* <AccessTimeIcon sx={{ paddingRight: 1 }} />{" "} */}
//                       {ongoingMeeting.createDateTime}
//                     </Typography>
//                     {/* </ListItemButton> */}
//                   </CardContent>

//                   <CardOverflow
//                     variant="soft"
//                     color="primary"
//                     sx={{
//                       px: 0.2,
//                       writingMode: "vertical-rl",
//                       justifyContent: "center",
//                       fontSize: "xs",
//                       fontWeight: "xl",
//                       letterSpacing: "1px",
//                       textTransform: "uppercase",
//                       borderLeft: "1px solid",
//                       borderColor: "divider",
//                     }}
//                   >
//                     {userId === ongoingMeeting.scrumMasterId ? (
//                       <ListItemButton
//                         onClick={() => {
//                           // navigate(`/vote/${ongoingMeeting.id}`);
//                           // handleStartButtonClick(ongoingMeeting.id);
//                         }}
//                       >
//                         Start {ongoingMeeting.scrumMasterId}
//                       </ListItemButton>
//                     ) : (
//                       <ListItemButton
//                         onClick={() => {
//                           // navigate(`/vote/${ongoingMeeting.id}`);
//                           // handleJoinButtonClick(ongoingMeeting.id);
//                         }}
//                         disabled={ongoingMeeting.status !== "active"}
//                       >
//                         Join
//                         {/* {ongoingMeeting.status} */}
//                       </ListItemButton>
//                     )}
//                   </CardOverflow>
//                 </Card>
//               </React.Fragment>
//             ))}
//           </Box>
//         </Grid>
//       )}
//     </Grid>
//   );
// };

export default OngoingMeetings;
