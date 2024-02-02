import React from "react";
import { Box, CardContent, List, ListItem, Typography } from "@mui/material";
import { Card } from "@mui/joy";
import Groups3Icon from "@mui/icons-material/Groups3";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";

const DetailedReportSessionComponent = ({ name = "sessions" }: any) => {
  return (
    <Card
      style={{ padding: 10, border: "1px solid #9DBEFF" }}
      variant="outlined"
    >
      <CardContent>
        <Typography
          fontSize={25}
          fontWeight={750}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
        >
          Session Details
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
        >
          <List>
            <ListItem>
              <DriveFileRenameOutlineOutlinedIcon
                fontSize="large"
                sx={{ marginRight: 1 }}
              />

              <Typography>Session Name {name}</Typography>
            </ListItem>
            <ListItem>
              <Groups3Icon fontSize="large" sx={{ marginRight: 1 }} />
              <Typography>Scrum Master {name}</Typography>
            </ListItem>
            <ListItem>
              <ManageAccountsRoundedIcon
                fontSize="large"
                sx={{ marginRight: 1 }}
              />
              <Typography>Product Manager : {name}</Typography>
            </ListItem>
            <ListItem>
              <SupervisedUserCircleRoundedIcon
                fontSize="large"
                sx={{ marginRight: 1 }}
              />
              <Typography>Product Owner : {name}</Typography>
            </ListItem>
            <ListItem>
              <CalendarMonthRoundedIcon
                fontSize="large"
                sx={{ marginRight: 1 }}
              />
              <Typography>Date : 12/12/12</Typography>
            </ListItem>
            <ListItem>
              <CalculateRoundedIcon fontSize="large" sx={{ marginRight: 1 }} />
              <Typography>Estimation Method : Fibonacci</Typography>
            </ListItem>
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DetailedReportSessionComponent;
