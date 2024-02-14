import Table from "@mui/joy/Table";
import React, { useState } from "react";
import Card from "@mui/joy/Card";
import { DeveloperListAPI } from "../../pages/VotingRoom/apis/DeveloperListAPI";
import { useSocket } from "../Socket/SocketContext";

interface tablePropType {
  sessionId: string;
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

const TableBox: React.FC<tablePropType> = ({ sessionId }) => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [userStoryMappingId, setUserStoryMappingId] = useState(0);

  const socket = useSocket();

  React.useEffect(() => {
    DeveloperListAPI(parseInt(sessionId))
      .then((response: any) => {
        console.log("Developer List from table:", response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });
  }, [sessionId, userStoryMappingId]);

  React.useEffect(() => {
    socket.on("selectedUserStoryMappingId", async (userStoryMappingId) => {});
    setUserStoryMappingId(userStoryMappingId);
    return () => {
      socket.off("selectedUserStoryMappingId");
    };
  }, [socket, userStoryMappingId]);

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
                <td>{userStoryMappingId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default TableBox;
