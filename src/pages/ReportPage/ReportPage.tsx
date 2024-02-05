import { Box, Typography } from "@mui/joy";
import React from "react";
import OverViewComponents from "../../components/ReportPage/OverView/OverViewComponents";
import UserStoryComponent from "../../components/ReportPage/UserStory/UserStoryComponent";
import DetailedReportComponent from "../../components/ReportPage/DetailedReport/DetailedReportComponent";
import Header from "../../components/Navbar/Header";
import { Grid } from "@mui/material";
const ReportPage = () => {
  return (
    <>
      <Header></Header>
      <Grid
        style={{ backgroundColor: "#E5F6F7" }}
        container
        spacing={3}
        sx={{ padding: 2 }}
      >
        <Grid item xs={12} sm={12} md={12}>
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
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <OverViewComponents />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
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
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <DetailedReportComponent />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography
            sx={{
              fontSize: "27px",
              fontWeight: "bold",
              marginLeft: 6,
              marginBottom: 5,
            }}
          >
            User Story
          </Typography>
          <Grid />
          <Grid item xs={12} sm={12} md={12}>
            <UserStoryComponent />
            <UserStoryComponent />
            <UserStoryComponent />
            <UserStoryComponent />
            <UserStoryComponent />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportPage;
