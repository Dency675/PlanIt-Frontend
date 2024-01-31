import { Box, Typography } from "@mui/joy";
import React from "react";
import OverViewComponents from "../../components/ReportPage/OverView/OverViewComponents";
import UserStoryComponent from "../../components/ReportPage/UserStory/UserStoryComponent";
import DetailedReportComponent from "../../components/ReportPage/DetailedReport/DetailedReportComponent";

const ReportPage = () => {
  return (
    <>
      <Box style={{ backgroundColor: "#E5F6F7" }}>
        <Typography
          sx={{
            fontSize: "27px",
            fontWeight: "bold",
            marginLeft: 6,
            marginBottom: 1,
          }}
        >
          Overview
        </Typography>
        <OverViewComponents />
        <Typography
          sx={{
            fontSize: "27px",
            fontWeight: "bold",
            marginLeft: 6,
            marginBottom: 1,
            marginTop: 2,
          }}
        >
          Detailed Report
        </Typography>
        <DetailedReportComponent />
        <Typography
          sx={{
            fontSize: "27px",
            fontWeight: "bold",
            marginLeft: 6,
            marginBottom: 1,
          }}
        >
          User Story
        </Typography>
        <UserStoryComponent />
        <UserStoryComponent />
        <UserStoryComponent />
        <UserStoryComponent />
        <UserStoryComponent />
      </Box>
    </>
  );
};

export default ReportPage;
