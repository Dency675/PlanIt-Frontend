import Table from "@mui/joy/Table";
import React, { useState } from "react";
import Card from "@mui/joy/Card";
import { DeveloperListAPI } from "../../pages/VotingRoom/apis/DeveloperListAPI";
import { useSocket } from "../Socket/SocketContext";

interface tablePropType {
  sessionId: string;
  currentUserStoryId: number;
  setScoreCounts: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}
interface UserData {
  userName: string;
  roleId: number;
  teamMemberId: number;
  score: {
    userStorySessionMappingId: number;
    storyPoint: string;
  }[];
}

const TableBox: React.FC<tablePropType> = ({
  sessionId,
  currentUserStoryId,
  setScoreCounts,
}) => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [userStoryMappingId, setUserStoryMappingId] = useState<number>(0);

  const socket = useSocket();

  // React.useEffect(() => {
  //   socket.emit("sessionParticipantsScore", sessionId, userData);
  // }, [userData, sessionId, currentUserStoryId]);

  React.useEffect(() => {
    console.log("currentUserStoryId", currentUserStoryId);
    console.log("currentUserStoryIduserStoryMappingId", userStoryMappingId);
    setUserStoryMappingId(currentUserStoryId);
  }, [currentUserStoryId, userStoryMappingId]);

  React.useEffect(() => {
    DeveloperListAPI(parseInt(sessionId))
      .then((response: any) => {
        console.log("Developer List from table:", response.data);
        setUserData(response.data);

        const counts: { [key: string]: number } = {};
        response.data.forEach((user: { score: any[] }) => {
          user.score.forEach((score) => {
            if (score.userStorySessionMappingId === userStoryMappingId) {
              counts[score.storyPoint] = (counts[score.storyPoint] || 0) + 1;
            }
          });
        });
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
