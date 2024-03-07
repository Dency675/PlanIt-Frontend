import React, { useEffect, useState, useRef } from "react";
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
import { useParams } from "react-router-dom";
import ReportPage from "./ReportPage";

const ReportPageHandler = () => {
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

  console.log("sessiondata", sessionData);
  return (
    <ReportPage
      viewMode={viewMode}
      overViewData={overViewData}
      sessionData={sessionData}
      barChartData={barChartData}
      participantData={participantData}
      userStoryData={userStoryData}
      visibleUserStoryCount={visibleUserStoryCount}
      participantScoreData={participantScoreData}
      userStoryRef={userStoryRef}
      toggleViewMode={toggleViewMode}
    />
  );
};

export default ReportPageHandler;
