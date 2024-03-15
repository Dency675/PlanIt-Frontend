import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sessionDetailsDataVoting } from "../ReportPage/apis/SessionDetailsAPIVoting";
import VotingRoom from "./VotingRoom";

const VotingRoomHandler = () => {
  const { sessionId } = useParams();
  const [userId, setUserId] = useState("");
  const [scrumMasterId, setScrumMasterId] = useState("");
  const [estimationId, setEstimationId] = useState(0);
  const [teamId, setTeamId] = useState(0);
  const [timer, setTimer] = useState("");
  const [currentUserStoryId, setCurrentUserStoryId] = useState<number>(0);
  const [isUsingJira, setIsUsingJira] = useState<boolean>(false);

  const userIdd = localStorage.getItem("userId");

  useEffect(() => {
    if (sessionId)
      sessionDetailsDataVoting(parseInt(sessionId))
        .then((response: any) => {
          setEstimationId(response.data.estimationId);
          setScrumMasterId(response.data.scrumMasterId);
          setTeamId(response.data.teamId);
          setTimer(response.data.timer);
          if (response.data.excelLink === "jira") setIsUsingJira(true);
        })
        .catch((error) => {
          console.error("Error occurred while changing status :", error);
        });
  }, [sessionId, teamId]);

  useEffect(() => {
    setUserId(userIdd as string);
  }, [userIdd]);

  return (
    <VotingRoom
      userId={userId}
      sessionId={sessionId as string}
      scrumMasterId={scrumMasterId}
      timer={timer}
      estimationId={estimationId}
      teamId={teamId}
      setCurrentUserStoryId={setCurrentUserStoryId}
      currentUserStoryId={currentUserStoryId}
      isUsingJira={isUsingJira}
    />
  );
};

export default VotingRoomHandler;
