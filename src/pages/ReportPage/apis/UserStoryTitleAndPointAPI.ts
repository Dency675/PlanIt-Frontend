import { axiosInstance } from "../../../config/configAxios";
import { UserStoryTitleAndPointResponse } from "../types";

export const getAllParticipantScoreBySessionIdData = async (
  sessionId: number,
  offset: number
): Promise<UserStoryTitleAndPointResponse> => {
  return await axiosInstance
    .get(
      `/getUserStoryDetailBySessionId?sessionId=${sessionId}&offset=${offset}}`
    )
    .then((data) => {
      console.log("getUserStoryDetailBySessionId", data.data);
      return data.data;
    })
    .catch((err) => err);
};
