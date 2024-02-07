import React from "react";
import {
  Box,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Card } from "@mui/joy";
import Groups3Icon from "@mui/icons-material/Groups3";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import { SessionDetailsResponsesParent } from "../../../pages/ReportPage/types";

const DetailedReportSessionComponent = ({
  sessionData,
}: SessionDetailsResponsesParent) => {
  const iconSize = "large";

  return (
    <Card variant="outlined" color="primary" sx={{ padding: 0 }}>
      <CardContent>
        <Typography
          fontSize={25}
          fontWeight={750}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          Session Details
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <DriveFileRenameOutlineOutlinedIcon fontSize={iconSize} />
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>Session Name</Typography>
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>{sessionData.data.sessionTitle}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Groups3Icon fontSize={iconSize} />
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>Scrum Master</Typography>
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>{sessionData.data.scrumMasterName}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <ManageAccountsRoundedIcon fontSize={iconSize} />
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>Project Manager</Typography>
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>{sessionData.data.projectManagerName}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <SupervisedUserCircleRoundedIcon fontSize={iconSize} />
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>Product Owner</Typography>
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>{sessionData.data.productOwnerName}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <CalendarMonthRoundedIcon fontSize={iconSize} />
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>Date</Typography>
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>
                    {sessionData.data.createDateTime.slice(0, 10)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <CalculateRoundedIcon fontSize={iconSize} />
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>Estimation Method</Typography>
                </TableCell>
                <TableCell
                  sx={{ paddingRight: 0, paddingTop: 1, paddingBottom: 1 }}
                >
                  <Typography>{sessionData.data.estimationName}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default DetailedReportSessionComponent;
