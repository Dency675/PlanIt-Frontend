import axios, { AxiosResponse } from "axios";

interface UserData {
  id: string;
  givenName: string;
  // Add other properties if needed
}

const getUserInformationById = async (id: string): Promise<string> => {
  try {
    const response: AxiosResponse<{ message: string; data: UserData }> =
      await axios.get(`http://localhost:3001/getUserInformationById?id=${id}`);
    const userData = response.data.data;
    return userData.givenName;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return ""; // Return an empty string or handle error as needed
  }
};

export default getUserInformationById;
