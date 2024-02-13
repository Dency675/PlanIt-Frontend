import axios, { AxiosResponse } from "axios";

const editSessionParticipants = async (
  sessionId: string,
  userId: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      "http://localhost:3001/editSessionParticipants",
      {
        sessionId: sessionId,
        userId: userId,
      }
    );

    console.log("Response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error editing session participants:", error);
    throw error;
  }
};
export default editSessionParticipants;
