import axios, { AxiosResponse } from "axios";

interface Participant {
  userId: string;
  roleId: number;
}

interface AddSessionParticipantsRequest {
  sessionId: number;
  participants: Participant[];
}

const addSessionParticipants = async (
  requestData: AddSessionParticipantsRequest
): Promise<any> => {
  try {
    console.log("requestData");
    console.log(requestData);
    const response: AxiosResponse<any> = await axios.post(
      "http://localhost:3001/addSessionParticipants",
      requestData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding session participants:", error);
    return null;
  }
};

export default addSessionParticipants;
