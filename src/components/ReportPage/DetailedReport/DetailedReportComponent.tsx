import { Box, Grid } from "@mui/material";
import React from "react";
import DetailedReportChartComponent from "./DetailedReportChartComponent";
import DetailedReportSessionComponent from "./DetailedReportSessionComponent";
import DetailedReportParticipantListComponent from "./DetailedReportParticipantListComponent";

const DetailedReportComponent = () => {
  return (
    <Grid
      container
      spacing={3}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Grid item xs={12} sm={4} md={5}>
        <DetailedReportChartComponent />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <DetailedReportSessionComponent />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <DetailedReportParticipantListComponent />
      </Grid>
    </Grid>
  );
};

export default DetailedReportComponent;
