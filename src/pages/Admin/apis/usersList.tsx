import axios from "axios";
 
export const fetchUsersData = async (page:any) => {
  try {
    const response = await axios.get(`http://localhost:3001/getAllUsers?offset=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching active count:", error);
  }
};

