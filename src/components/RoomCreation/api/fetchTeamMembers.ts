import axios, { AxiosResponse } from "axios";

const fetchMembers = async (teamId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `http://localhost:3001/getMembers?teamId=${teamId}`
    );

    console.log(" response.data from team membr");
    console.log(response.data.activeTeamMembers);

    const participants = response.data.activeTeamMembers.map(
      (item: { userId: string; roleId: number }) => ({
        userId: item.userId,
        roleId: 5,
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
