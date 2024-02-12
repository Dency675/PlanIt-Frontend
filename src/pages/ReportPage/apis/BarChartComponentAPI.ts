import { axiosInstance } from "../../../config/configAxios";
import { BarChartComponentResponsesData } from "../types";

export const BarChartComponentData = async (
  sessionId: number
): Promise<BarChartComponentResponsesData> => {
  return await axiosInstance
    .get(`/getAllUserStoriesBySessionId?sessionId=${sessionId}`)
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};
