import { axiosInstance } from "../../../config/configAxios";
import { ParticipantDataListResponsesData } from "../types";

export const ParticiantListData = async (
  sessionId: number
): Promise<ParticipantDataListResponsesData> => {
  return await axiosInstance
    .get(`/getParticipantsInSession?sessionId=${sessionId}`)
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};
