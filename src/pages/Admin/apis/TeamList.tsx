import axios from "axios";
 
export const fetchTeamList = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/getAllTeamInformation`);
    return response.data.teamInfoList;
  } catch (error) {
    console.error("Error fetching active count:", error);
  }
};