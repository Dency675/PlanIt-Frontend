import { axiosInstance } from "../../../config/configAxios";
import { SessionDetailsResponsesData } from "../types";

export const sessionDetailsDataVoting = async (
  sessionId: number
): Promise<SessionDetailsResponsesData> => {
  return await axiosInstance
    .get(`/getSessionByIdVoting?sessionId=${sessionId}`)
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};
