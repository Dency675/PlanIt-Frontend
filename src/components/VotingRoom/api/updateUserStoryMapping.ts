import axios, { AxiosResponse } from "axios";

const updateUserStoryMapping = async (
  selectedUserStoryId: number,
  commentValue: string,
  score: string,
  count: number
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      "http://localhost:3001/updateUserStorySessionMapping",
      {
        userStorySessionMappingId: selectedUserStoryId,
        comment: commentValue,
        storyPointResult: score,
        roundNumber: count,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error editing session participants:", error);
    throw error;
  }
};
export default updateUserStoryMapping;
