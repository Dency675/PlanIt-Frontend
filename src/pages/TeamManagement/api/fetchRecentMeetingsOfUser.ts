import axios from "axios";
import { formatDateTime } from "./formatDateTime";

interface RequestBody {
  sortBy?: string;
  sortOrder?: string;
  fromDate?: string;
  toDate?: string;
  offset?: number;
  limit?: number;
}

const fetchRecentMeetingsOfUser = async (
  userId: string,
  requestBody: RequestBody
) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/getAllRecentMeetingsOfUser?userId=${userId}`,
      { data: requestBody }
    );

    console.log(response.data);

    const ongoingMeetingData = response.data.map((meeting: any) => ({
      ...meeting,
      createDateTime: formatDateTime(meeting.createDateTime),
    }));

    return ongoingMeetingData;
  } catch (error) {
    console.error("Error fetching recent meetings:", error);
    throw error;
  }
};

export default fetchRecentMeetingsOfUser;
