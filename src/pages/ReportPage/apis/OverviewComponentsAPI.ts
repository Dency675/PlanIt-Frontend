import { axiosInstance } from "../../../config/configAxios";
import { OverviewComponentDataResponse } from "../types";

export const OverViewComponentData = async (
  sessionId: number
): Promise<OverviewComponentDataResponse> => {
  return await axiosInstance
    .get(`/getStoryCount?sessionId=${sessionId}`)
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};
