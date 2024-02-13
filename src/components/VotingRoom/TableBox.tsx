import Table from "@mui/joy/Table";
import React, { useState } from "react";
import Card from "@mui/joy/Card";
import { DeveloperListAPI } from "../../pages/VotingRoom/apis/DeveloperListAPI";
interface tablePropType {
  sessionId: string;
}
interface UserData {
  userName: string;
  roleId: number;
  teamMemberId: number;
}

const TableBox: React.FC<tablePropType> = ({ sessionId }) => {
  const [userData, setUserData] = useState<UserData[]>([]);

  React.useEffect(() => {
    DeveloperListAPI(parseInt(sessionId))
      .then((response: any) => {
        console.log("Developer List:", response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });
  }, [sessionId]);

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
          {/* <tbody>
            <tr>
              <td>Aljo</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Dency</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Mariyam</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Hari</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Geevarghese</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Angelkina</td>
              <td>4</td>
            </tr>
          </tbody> */}

          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{user.userName}</td>
                <td>{user.roleId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default TableBox;
