import axios from "axios";
import { formatDateTime } from "./formatDateTime";

const fetchOngoingMeetingById = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/getAllOngoingMeetingsOfUser?userId=${userId}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching meeting:", error);
  }
};

export default fetchOngoingMeetingById;
