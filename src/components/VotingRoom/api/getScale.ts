import axios from "axios";

const getScales = async (estimationId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/scales/${estimationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user stories:", error);
    throw error;
  }
};

export default getScales;
