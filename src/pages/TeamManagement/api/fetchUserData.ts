import axios, { AxiosResponse } from "axios";

interface UserData {
  id: string;
  givenName: string;
  email: string;
  surName: string;
}

const getUserInformationById = async (
  id: string
): Promise<{ givenName: string; email: string; surName: string }> => {
  try {
    const response: AxiosResponse<{ message: string; data: UserData }> =
      await axios.get(`http://localhost:3001/getUserInformationById?id=${id}`);
    const userData = response.data.data;

    const { givenName, email, surName } = userData;
    console.log("userdata", userData);
    return { givenName, email, surName };
  } catch (error) {
    console.error("Error fetching user information:", error);
    return { givenName: "", email: "", surName: "" }; // Return an object with default values or handle error as needed
  }
};

export default getUserInformationById;
