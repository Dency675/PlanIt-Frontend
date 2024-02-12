import { Grid } from "@mui/material";
import React from "react";
import DetailedReportChartComponent from "./DetailedReportChartComponent";
import DetailedReportSessionComponent from "./DetailedReportSessionComponent";
import DetailedReportParticipantListComponent from "./DetailedReportParticipantListComponent";
import {
  BarChartComponentResponsesData,
  ParticipantDataListResponsesData,
  SessionDetailsResponsesData,
} from "../../../pages/ReportPage/types";

interface DetailedReportComponentProps {
  sessionData: SessionDetailsResponsesData;
  barChartData: BarChartComponentResponsesData;
  participantData: ParticipantDataListResponsesData;
}

const DetailedReportComponent: React.FC<DetailedReportComponentProps> = ({
  sessionData,
  barChartData,
  participantData,
}) => {
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
      {/* <Grid item xs={12} sm={4} md={4.5}>
        <DetailedReportChartComponent barChartData={barChartData} />
      </Grid> */}
      <Grid item xs={12} sm={4} md={4}>
        <DetailedReportSessionComponent sessionData={sessionData} />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <DetailedReportParticipantListComponent
          participantData={participantData}
        />
      </Grid>
    </Grid>
  );
};

export default DetailedReportComponent;
