import axios, { AxiosResponse } from "axios";
import { AddParticipantScoresRequest } from "../types";

const addParticipantScores = async (data: AddParticipantScoresRequest) => {
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:3001/participantScores",
      data
    );

    console.log("Data inserted successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error adding participant scores:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default addParticipantScores;
