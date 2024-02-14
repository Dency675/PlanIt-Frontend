import axios from "axios";
 
export const fetchTeamManagers = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/getAllTeamManager`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching active count:", error);
  }
};

