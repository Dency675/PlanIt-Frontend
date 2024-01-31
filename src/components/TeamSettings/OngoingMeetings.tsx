import { Padding } from "@mui/icons-material";
import {
  AspectRatio,
  Box,
  Card,
  CardOverflow,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Sheet,
  Typography,
} from "@mui/joy";
import { CardContent } from "@mui/joy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
// import { Link } from "react-router-dom";

const OngoingMeetings = () => {
  return (
    <Box>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: "0.15rem", ml: 4, fontSize: 16 }}
      >
        Ongoing Meeting
      </Typography>
      <Card
        orientation="horizontal"
        variant="outlined"
        sx={{ width: 200, m: 3 }}
      >
        <CardContent>
          <Typography fontWeight="md" textColor="success.plainColor">
            Meeting Name
          </Typography>
          <Typography level="body-sm" sx={{ display: "flex" }}>
            <AccessTimeIcon sx={{ paddingRight: 1 }} /> 1.00 pm
          </Typography>
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
          JOIN
          {/* <Link to="/">JOIN</Link> */}
        </CardOverflow>
      </Card>
    </Box>
  );
};

export default OngoingMeetings;
