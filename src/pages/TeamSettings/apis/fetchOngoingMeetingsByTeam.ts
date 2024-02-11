// import axios from "axios";
// import { formatDateTime } from "./formatDateTime";

// const fetchOngoingMeetingById = async (userId: string) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:3001/getAllOngoingMeetingsOfUser?userId=${userId}`
//     );
//     // const ongoingMeetingData = response.data;

//     const ongoingMeetingData = response.data.map((meeting: any) => ({
//       ...meeting,
//       createDateTime: formatDateTime(meeting.createDateTime),
//     }));

//     return ongoingMeetingData;
//   } catch (error) {
//     console.error("Error fetching meeting:", error);
//   }
// };

// export default fetchOngoingMeetingById;

import axios from "axios";
import { formatDateTime } from "./formatDateTime";

const fetchOngoingMeetingsByTeam = async (teamId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/getAllOngoingMeetings?teamId=${teamId}`
    );
    // const ongoingMeetingData = response.data;

    const ongoingMeetingData = response.data.map((meeting: any) => ({
      ...meeting,
      createDateTime: formatDateTime(meeting.createDateTime),
    }));

    return ongoingMeetingData;
  } catch (error) {
    console.error("Error fetching meeting:", error);
  }
};

export default fetchOngoingMeetingsByTeam;
