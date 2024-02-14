import axios, { AxiosResponse } from "axios";

export const resetStoryPoint = async (userStorySessionMappingId: number) => {
  try {
    const response: AxiosResponse = await axios.put(
      `http://localhost:3001/resetStoryPoint`,
      { userStorySessionMappingId: userStorySessionMappingId }
    );

    if (response.status === 200) {
      console.log(`resetStoryPoint.`);
    } else {
      throw new Error(`Failed to resetStoryPoint`);
    }
  } catch (error: any) {
    throw new Error(`Error resetStoryPoint`);
  }
};
