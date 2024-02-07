import { axiosInstance } from "../../../config/configAxios";
import { BarChartComponentResponsesData } from "../types";

export const BarChartComponentData = async (
  sessionId: number
): Promise<BarChartComponentResponsesData> => {
  return await axiosInstance
    .get(`/getAllUserStoriesBySessionId?sessionId=${sessionId}`)
    .then((data) => {
      console.log("data.data");
      console.log(data.data);
      return data.data;
    })
    .catch((err) => err);
};
