import axios, { AxiosResponse } from "axios";

const fetchMembers = async (teamId: string, userId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `http://localhost:3001/getMembers?teamId=${teamId}&userId=${userId}`
    );

    console.log(" response.data from team membr");
    console.log(response.data.activeTeamMembers);
    console.log(
      "response.data.activeTeamMembers[0].roleName",
      response.data.activeTeamMembers[0].roleName
    );

    const roleName = response.data.activeTeamMembers[0].roleName;

    const participants = response.data.activeTeamMembers.map(
      (item: { userId: string; roleId: number; roleName: string }) => ({
        userId: item.userId,
        roleId: item.roleName === "project manager" ? 2 : 5,
      })
    );

    console.log("participants from tea,");
    console.log(participants);
    return participants;
  } catch (error) {
    console.error("Error fetching members:", error);
    return null; // Handle error appropriately in your application
  }
};

export default fetchMembers;
