import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
} from "@mui/material";
import OverViewComponents from "../../components/ReportPage/OverView/OverViewComponents";
import UserStoryComponent from "../../components/ReportPage/UserStory/UserStoryComponent";
import DetailedReportComponent from "../../components/ReportPage/DetailedReport/DetailedReportComponent";
import Header from "../../components/Navbar/Header";
import { OverViewComponentData } from "./apis/OverviewComponentsAPI";
import { ParticiantListData } from "./apis/ParticipantListAPI";
import { sessionDetailsData } from "./apis/SessionDetailsAPI";
import { BarChartComponentData } from "./apis/BarChartComponentAPI";
import { getAllParticipantScoreBySessionIdData } from "./apis/UserStoryTitleAndPointAPI";
import { getParticipantScoreData } from "./apis/ParticipantScoreAPI";
import {
  BarChartComponentResponsesData,
  OverviewComponentDataResponse,
  ParticipantDataListResponsesData,
  SessionDetailsResponsesData,
  UserStoryTitleAndPointResponse,
  UserStory,
} from "./types";
import html2pdf from "html2pdf.js";
import { Box, Button } from "@mui/joy";
import { useParams } from "react-router-dom";

const ReportPage = () => {
  const { sessionId } = useParams();

  const [currentSessionId, setCurrentSessionId] = useState<number>(
    parseInt(sessionId as string)
  );

  const [viewMode, setViewMode] = useState("detailed");

  React.useEffect(() => {
    return setCurrentSessionId(parseInt(sessionId as string));
  }, [sessionId]);

  const toggleViewMode = (
    event: any,
    newMode: React.SetStateAction<string>
  ) => {
    setViewMode(newMode);
  };

  const [overViewData, setOverViewData] =
    useState<OverviewComponentDataResponse>({
      totalCount: 0,
      completeStoryCount: 0,
      incompleteUserStoryCount: 0,
      participantCount: 0,
    });

  const [offset, setOffset] = useState<number>(0);

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

  const [visibleUserStoryCount, setVisibleUserStoryCount] = useState(
    offset + 6
  );

  const [userStoryData, setUserStoryData] =
    useState<UserStoryTitleAndPointResponse>([]);

  const loadMoreUserStories = () => {
    setVisibleUserStoryCount((prevCount) => prevCount + 6);
    setOffset((prev) => prev + 6);
  };

  const [participantScoreData, setParticipantScoreData] = useState<UserStory[]>(
    [
      {
        userStoryId: 0,
        participantScores: [{ storyPoint: " ", participantName: " " }],
      },
    ]
  );

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMoreUserStories();
        }
      },
      { threshold: 1 }
    )
  );

  const userStoryRef = useRef(null);

  useEffect(() => {
    const currentObserver = observer.current;
    if (userStoryRef.current) {
      currentObserver.observe(userStoryRef.current);
    }

    return () => {
      currentObserver.disconnect();
    };
  }, [userStoryRef.current]);

  useEffect(() => {
    const fetchgetParticipantScoreData = async () => {
      try {
        const participantScoreData = await getParticipantScoreData(
          currentSessionId
        );
        console.log("1", participantScoreData);
        setParticipantScoreData(participantScoreData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchgetParticipantScoreData();
  }, []);

  useEffect(() => {
    const fetchOverViewComponentData = async () => {
      try {
        const overViewData = await OverViewComponentData(currentSessionId);
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
        const participantData = await ParticiantListData(currentSessionId);
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
        const sessionData = await sessionDetailsData(currentSessionId);
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
        const barChartData = await BarChartComponentData(currentSessionId);
        setBarChartData(barChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBarChartData();
  }, []);

  useEffect(() => {
    const fetchgetAllParticipantScoreBySessionIdData = async () => {
      try {
        const userStoryData = await getAllParticipantScoreBySessionIdData(
          currentSessionId,
          offset
        );
        setUserStoryData((prevUserStoryData) => [
          ...prevUserStoryData,
          ...userStoryData,
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchgetAllParticipantScoreBySessionIdData();
  }, [visibleUserStoryCount]);

  const totalUserStories = overViewData.completeStoryCount;

  const handleDownloadPDF = () => {
    const element = document.getElementById("reportPage");
    html2pdf().from(element).save();
  };
  console.log("sessiondata", sessionData);
  return (
    <>
      <Header></Header>
      <Grid>
        <Grid
          id="reportPage"
          style={{ backgroundColor: "#f0f3f7" }}
          container
          spacing={3}
          sx={{ padding: 2 }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={toggleViewMode}
              aria-label="report view mode"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 125,
              }}
            >
              <ToggleButton
                value="detailed"
                aria-label="detailed"
                color="primary"
              >
                Detailed Report
              </ToggleButton>
              <ToggleButton value="short" aria-label="short" color="primary">
                Brief Report
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
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
          {viewMode === "detailed" && (
            <>
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
            </>
          )}
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
            {Array.from({ length: userStoryData.length }, (_, index) => (
              <Grid item xs={12} sm={12} md={12} key={index}>
                {index < visibleUserStoryCount &&
                  userStoryData[index].storyPointResult != 0 && (
                    <UserStoryComponent
                      userStoryData={userStoryData}
                      index={index}
                      participantScoreData={participantScoreData}
                      viewMode={viewMode}
                    />
                  )}
              </Grid>
              // </>
            ))}
          </Grid>
        </Grid>
        <Grid style={{ backgroundColor: "#f0f3f7" }}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", pb: 3, mr: 10 }}
          >
            <Button onClick={handleDownloadPDF} color="primary">
              Download PDF
            </Button>
          </Box>
        </Grid>
        <div ref={userStoryRef} />
      </Grid>
    </>
  );
};

export default ReportPage;
