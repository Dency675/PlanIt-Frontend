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

// import axios from "axios";
// import { formatDateTime } from "./formatDateTime";

// const fetchOngoingMeetingsByTeam = async (teamId: number) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:3001/getAllOngoingMeetings?teamId=${teamId} `
//     );
//     // const ongoingMeetingData = response.data;

//     const ongoingMeetingData = response.data.map((meeting: any) => ({
//       ...meeting,
//       createDateTime: formatDateTime(meeting.createDateTime),
//     }));
//     console.log("ongoing API", ongoingMeetingData);
//     return ongoingMeetingData;
//   } catch (error) {
//     console.error("Error fetching meeting:", error);
//   }
// };
// const fetchOngoingMeetingsByTeam = async (
//   teamId: number
//   //   requestBody: RequestBody
// ) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:3001/getAllOngoingMeetings?teamId=${teamId}`
//       //   { data: requestBody }
//     );

//     console.log("Response data:", response.data);

//     const meetingData = Array.isArray(response.data)
//       ? response.data[0]
//       : response.data;

//     const ongoingMeetingData = {
//       ...meetingData,
//       createDateTime: formatDateTime(meetingData.createDateTime),
//     };

//     return ongoingMeetingData;
//   } catch (error) {
//     console.error("Error fetching recent meetings:", error);
//     throw error;
//   }
// };

// export default fetchOngoingMeetingsByTeam;
import axios from "axios";
import { formatDateTime } from "./formatDateTime";

const fetchOngoingMeetingsByTeam = async (teamId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/getAllOngoingMeetings?teamId=${teamId}`
    );

    console.log("Response data:", response.data);

    const ongoingMeetingData = Array.isArray(response.data)
      ? response.data.map((meeting: any) => ({
          ...meeting,
          createDateTime: formatDateTime(meeting.createDateTime),
        }))
      : [response.data];

    console.log("Ongoing meetings:", ongoingMeetingData);

    return ongoingMeetingData;
  } catch (error) {
    console.error("Error fetching recent meetings:", error);
    throw error;
  }
};

export default fetchOngoingMeetingsByTeam;
