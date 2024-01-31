import { Box } from "@mui/material";
import React from "react";
import DetailedReportChartComponent from "./DetailedReportChartComponent";
import DetailedReportSessionComponent from "./DetailedReportSessionComponent";

const DetailedReportComponent = () => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <DetailedReportChartComponent />
      <DetailedReportSessionComponent />
    </Box>
  );
};

export default DetailedReportComponent;
