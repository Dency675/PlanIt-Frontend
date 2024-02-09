import { axiosInstance } from "../../../config/configAxios";
import { ParticipantDataListResponsesData } from "../../ReportPage/types";

export const DeveloperListAPI = async (
  sessionId: number
): Promise<ParticipantDataListResponsesData> => {
  return await axiosInstance
    .get(`/getDevelopersInSession?sessionId=${sessionId}`)
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};
