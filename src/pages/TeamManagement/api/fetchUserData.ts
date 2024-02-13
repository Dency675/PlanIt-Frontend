import axios, { AxiosResponse } from "axios";

interface UserData {
  id: string;
  givenName: string;
  email: string;
  // Add other properties if needed
}

const getUserInformationById = async (
  id: string
): Promise<{ givenName: string; email: string }> => {
  try {
    const response: AxiosResponse<{ message: string; data: UserData }> =
      await axios.get(`http://localhost:3001/getUserInformationById?id=${id}`);
    const userData = response.data.data;

    const { givenName, email } = userData;
    console.log("userdata", userData);
    return { givenName, email };
  } catch (error) {
    console.error("Error fetching user information:", error);
    return { givenName: "", email: "" }; // Return an object with default values or handle error as needed
  }
};

export default getUserInformationById;
