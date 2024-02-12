import { axiosInstance } from "../../../config/configAxios";
import { UserStory } from "../types";

export const getParticipantScoreData = async (
  sessionId: number
): Promise<UserStory[]> => {
  return await axiosInstance
    .get(`/getStoryPointByParticipants?sessionId=${sessionId}`)
    .then((data) => {
      return data.data.data;
    })
    .catch((err) => err);
};
