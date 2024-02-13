import axios, { AxiosResponse } from "axios";

interface TeamMemberInformation {
  teamMemberId: string;
  userGivenName: string;
  userId: string;
  roleName: string;
}

const getTeamMemberInformationByUserId = async (
  teamId: number,
  userId: string
) => {
  try {
    const response: AxiosResponse = await axios.get(
      "http://localhost:3001/getTeamMemberInformationByUserId",
      {
        params: {
          teamId: teamId,
          userId: userId,
        },
      }
    );

    const data: { activeTeamMembers: TeamMemberInformation[] } = response.data;
    console.log("Active team members:", data.activeTeamMembers);
    return data.activeTeamMembers[0];
  } catch (error: any) {
    console.error(
      "Error fetching team member information:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default getTeamMemberInformationByUserId;
