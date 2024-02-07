import { Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import OverViewComponents from "../../components/ReportPage/OverView/OverViewComponents";
import UserStoryComponent from "../../components/ReportPage/UserStory/UserStoryComponent";
import DetailedReportComponent from "../../components/ReportPage/DetailedReport/DetailedReportComponent";
import Header from "../../components/Navbar/Header";
import { Grid } from "@mui/material";
import { OverViewComponentData } from "./apis/OverviewComponentsAPI";
import { ParticiantListData } from "./apis/ParticipantListAPI";
import {
  BarChartComponentResponsesData,
  OverviewComponentDataResponse,
  ParticipantDataListResponsesData,
  SessionDetailsResponsesData,
} from "./types";
import { sessionDetailsData } from "./apis/SessionDetailsAPI";
import { BarChartComponentData } from "./apis/BarChartComponentAPI";

const ReportPage = () => {
  const [overViewData, setOverViewData] =
    useState<OverviewComponentDataResponse>({
      totalCount: 0,
      completeStoryCount: 0,
      incompleteUserStoryCount: 0,
      participantCount: 0,
    });
  const [sessionData, setSessionData] = useState<SessionDetailsResponsesData>({
    data: {
      sessionTitle: " ",
      productOwnerName: " ",
      projectManagerName: " ",
      createDateTime: " ",
      estimationName: " ",
      scrumMasterName: " ",
      participantCount: 0,
    },
  });
  const [barChartData, setBarChartData] =
    useState<BarChartComponentResponsesData>({
      data: {
        userStoryId: 0,
        storyPointResult: 0,
      },
    });

  const [participantData, SetParticipantData] =
    useState<ParticipantDataListResponsesData>({
      data: {
        userName: "hari",
      },
    });

  useEffect(() => {
    const fetchOverViewComponentData = async () => {
      try {
        const overViewData = await OverViewComponentData(1);
        setOverViewData(overViewData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOverViewComponentData();
  }, []);

  useEffect(() => {
    const fetchParticipantListData = async () => {
      try {
        const participantData = await ParticiantListData(1);
        SetParticipantData(participantData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchParticipantListData();
  }, []);

  useEffect(() => {
    const fetchSessionDataDetails = async () => {
      try {
        const sessionData = await sessionDetailsData(1);
        console.log(sessionData);
        setSessionData(sessionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSessionDataDetails();
  }, []);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const barChartData = await BarChartComponentData(1);
        setBarChartData(barChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBarChartData();
  }, []);
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
          <OverViewComponents
            overViewData={overViewData}
            sessionData={sessionData}
          />
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
          <DetailedReportComponent
            participantData={participantData}
            sessionData={sessionData}
            barChartData={barChartData}
          />
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
