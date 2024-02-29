import axios from "axios";

// Function to search users
export const searchUsers = async (query: any) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/searchUser?search=${query}`
    );
    return response.data.userResults;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};
