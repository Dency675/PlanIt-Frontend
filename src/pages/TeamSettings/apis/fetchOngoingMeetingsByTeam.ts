import axios from "axios";
import { formatDateTime } from "./formatDateTime";

const fetchOngoingMeetingsByTeam = async (teamId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/getAllOngoingMeetings?teamId=${teamId}`
    );

    console.log("ongoinggg", teamId);
    console.log("ongoinggg activities", response);
    return response;
  } catch (error) {
    console.error("Error fetching recent meetings:", error);
    throw error;
  }
};

export default fetchOngoingMeetingsByTeam;
