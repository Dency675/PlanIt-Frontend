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
<<<<<<< HEAD
import fetchOngoingMeeting from "./api/fetchOngoingMeetings";
// import { Link } from "react-router-dom";

interface OngoingMeetingProps {
  ongoingMeetings: { sessionTitle: string; createDateTime: string }[];
}

const OngoingMeetings = ({ ongoingMeetings }: OngoingMeetingProps) => {
=======
import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";

interface OngoingMeetingProps {
  id: number;
  sessionTitle: string;
  createDateTime: string;
}

const OngoingMeetings = () => {
  const navigate = useNavigate();
  const [ongoingMeetings, setOngoingMeetings] = useState<OngoingMeetingProps[]>(
    []
  );

  useEffect(() => {
    const fetchOngoingMeeting = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getAllOngoingMeetings?teamId=1`
        );
        const ongoingMeetingData = response.data;
        setOngoingMeetings(ongoingMeetingData);
        console.log(ongoingMeetingData);
      } catch (error) {
        console.error("Error fetching meeting:", error);
      }
    };
    fetchOngoingMeeting();
  }, []);

>>>>>>> 75919f4 (conflict resolved)
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
                  <ListItemButton
                    onClick={() => navigate(`/room/${ongoingMeeting.id}`)}
                  >
                    Join
                  </ListItemButton>
                  {/* JOIN */}
                  {/* <Link to="/">JOIN</Link> */}
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
