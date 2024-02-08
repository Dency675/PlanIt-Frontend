import axios from "axios";

const fetchOngoingMeeting = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/getAllOngoingMeetings?teamId=1`
    );
    const ongoingMeetingData = response.data;

    return ongoingMeetingData;
  } catch (error) {
    console.error("Error fetching meeting:", error);
  }
};

export default fetchOngoingMeeting;
