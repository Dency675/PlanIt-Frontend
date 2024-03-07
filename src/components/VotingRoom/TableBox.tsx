import Table from "@mui/joy/Table";
import React, { useState } from "react";
import Card from "@mui/joy/Card";
import { DeveloperListAPI } from "../../pages/VotingRoom/apis/DeveloperListAPI";
import { useSocket } from "../Socket/SocketContext";
import { ResultTableBoxPropType, UserDataWithScore } from "./types";

const TableBox: React.FC<ResultTableBoxPropType> = ({
  sessionId,
  currentUserStoryId,
  setScoreCounts,
  setScore,
}) => {
  const [userData, setUserData] = useState<UserDataWithScore[]>([]);
  const [userStoryMappingId, setUserStoryMappingId] = useState<number>(0);

  const socket = useSocket();

  React.useEffect(() => {
    setUserStoryMappingId(currentUserStoryId);
  }, [currentUserStoryId, userStoryMappingId]);

  React.useEffect(() => {
    DeveloperListAPI(parseInt(sessionId))
      .then((response: any) => {
        console.log("Developer List from table:", response.data);
        setUserData(response.data);

        const counts: { [key: string]: number } = {};
        const scorePoints: { [key: string]: string } = {};
        response.data.forEach((user: { score: any[] }) => {
          user.score.forEach((score) => {
            if (score.userStorySessionMappingId === userStoryMappingId) {
              counts[score.storyPoint] = (counts[score.storyPoint] || 0) + 1;
              scorePoints[score.storyPoint] = score.storyPoint;
            }
          });
        });
        setScore(scorePoints);
        setScoreCounts(counts);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });
  }, [sessionId, userStoryMappingId]);

  return (
    <div style={{ maxHeight: "40%", overflow: "auto" }}>
      <Card>
        <Table aria-label="basic table" stickyHeader sx={{ border: "none" }}>
          <thead>
            <tr>
              <th>
                <b>Name</b>
              </th>
              <th>
                <b>Point</b>
              </th>
            </tr>
          </thead>

          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{user.userName}</td>
                <td>
                  {
                    user.score.find(
                      (score) =>
                        score.userStorySessionMappingId === userStoryMappingId
                    )?.storyPoint
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default TableBox;
