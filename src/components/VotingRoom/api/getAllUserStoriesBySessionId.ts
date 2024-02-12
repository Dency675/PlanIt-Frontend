import axios from "axios";

const getAllUserStoriesBySessionId = async (sessionId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/getAllUserStoriesBySessionId?sessionId=${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user stories:", error);
    throw error;
  }
};

export default getAllUserStoriesBySessionId;
