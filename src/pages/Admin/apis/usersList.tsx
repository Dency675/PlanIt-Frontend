import axios from "axios";
 
export const fetchUsersData = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/getAllUsers`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching active count:", error);
  }
};