import { axiosInstance } from "../../../config/configAxios";
import { SessionDetailsResponsesData } from "../types";

export const sessionDetailsData = async (
  sessionId: number
): Promise<SessionDetailsResponsesData> => {
  return await axiosInstance
    .get(`/getSessionById?sessionId=${sessionId}`)
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};
