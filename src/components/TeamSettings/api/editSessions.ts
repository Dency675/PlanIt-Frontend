import axios from "axios";

const editSessions = async (sessionId: number) => {
  try {
    const response = await axios.patch("http://localhost:3001/editSessions", {
      sessionId: sessionId,
      status: "active",
    });

    return response.data;
  } catch (error) {
    console.error("Error editing session:", error);
    throw error;
  }
};

export default editSessions;
